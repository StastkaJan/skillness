import { deleteTeaching, getTeaching } from '$db/teaching'

export const DELETE = async ({ request, locals }) => {
	let teaching = await request.json()

	try {
		let teachingDB = await getTeaching(teaching.teaching)

		if (teachingDB.length > 0 && teachingDB[0].teacher == locals.user.id) {
			await deleteTeaching(teaching.teaching)

			let status = 200
			let returnObj = {
				result: 'success',
				text: 'Změna úspěšně uložena!'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let status = 404
		let returnObj = {
			result: 'error',
			text: 'Nebyl nalezen záznam'
		}
		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
