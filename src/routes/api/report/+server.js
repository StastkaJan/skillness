import { setReport } from '$db/report'
import { emailVal, bioVal } from '$util/validate'

export const POST = async ({ request }) => {
	let { email, text } = await request.json()
	let returnObj = {
		status: 0,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {}
	}
	let validation = {
		email: '',
		text: ''
	}

	validation.email = emailVal(email)
	validation.text = bioVal(text)

	Object.keys(validation).forEach(key => {
		if (validation[key] === '') {
			delete validation[key]
		}
	})

	if (Object.keys(validation).length > 0) {
		returnObj.status = 200
		returnObj.body = JSON.stringify({
			result: 'error',
			text: validation[Object.keys(validation)[0]]
		})
		return new Response(JSON.stringify(returnObj))
	}

	try {
		await setReport(email, text)

		returnObj.status = 200
		returnObj.body = JSON.stringify({
			result: 'success',
			text: 'Zpráva úspěšně nahlášena!'
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
