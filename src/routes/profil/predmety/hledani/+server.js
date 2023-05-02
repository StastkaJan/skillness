import { searchSubject } from '$db/subject'

export const POST = async ({ request }) => {
	let { subject } = await request.json()

	try {
		let subjectDB = await searchSubject(subject)

		let status = 200
		let returnObj = {
			result: 'succes',
			content: subjectDB
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
