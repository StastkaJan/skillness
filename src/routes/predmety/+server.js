import { getAllSubjects, getAllSubjectsOpt } from '$db/subject'

export const GET = async ({ url }) => {
	let returnObj = {
		status: 0,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {}
	}

	try {
		let subjects = await getAllSubjectsOpt(url.searchParams)

		returnObj.status = 200
		returnObj.body = JSON.stringify({
			subjects
		})
		return new Response(JSON.stringify(returnObj))
	} catch (err) {
		returnObj.status = 500
		returnObj.body = JSON.stringify({
			result: 'error',
			text: 'Interní chyba serveru'
		})
		return new Response(JSON.stringify(returnObj))
	}
}
