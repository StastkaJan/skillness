import { getTimetable, deleteTimetable, setTimetable } from '$db/timetable'

export const POST = async ({ request, locals }) => {
	let timetable = await request.json()
	console.log(timetable)

	try {
		await deleteTimetable(locals.user.id)

		await setTimetable(locals.user.id, timetable)

		let status = 200
		let returnObj = {
			result: 'success',
			text: 'Úspěšně uloženo'
		}
		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		console.log(err)
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
