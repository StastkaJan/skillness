import { setReport } from '$db/report'
import { emailVal, bioVal } from '$util/validate'

export const load = async ({ locals }) => {
	return {
		user: locals.user
	}
}

export const actions = {
	saveReport: async ({ request }) => {
		let formData = await request.formData()
		let email = formData.get('email')
		let topic = formData.get('topic')
		let text = formData.get('text')

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
			let returnObj = {
				result: 'error',
				text: validation[Object.keys(validation)[0]]
			}
			return returnObj
		}

		try {
			await setReport(email, topic, text)

			let returnObj = {
				result: 'success',
				text: 'Zpráva úspěšně odeslána!'
			}
			return returnObj
		} catch (err) {
			console.log(err)
			let returnObj = {
				result: 'error',
				text: 'Interní chyba serveru'
			}
			return returnObj
		}
	}
}
