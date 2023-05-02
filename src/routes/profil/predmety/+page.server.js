import { getTeachings } from '$db/teaching'
import { getTeachingSubject, setTeaching, updateTeaching } from '$db/teaching'
import { getSubject } from '$db/subject'
import { subjectVal, priceVal } from '$util/validate'

export const load = async ({ locals }) => {
	let teaching = await getTeachings(locals.user.id)

	return {
		teaching,
		user: locals.user
	}
}

export const actions = {
	addSubject: async ({ request, locals }) => {
		let formData = await request.formData()
		let subject = formData.get('subject')
		let price = formData.get('price')
		let subjectId = formData.get('id')

		let validation = {
			subject: '',
			price: ''
		}

		validation.subject = subjectVal(subject)
		validation.price = priceVal(price)

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
			let subjectDB = await getSubject(subjectId)

			if (subjectDB.length < 1) {
				let returnObj = {
					result: 'error',
					text: 'Předmět neexistuje'
				}
				return returnObj
			}

			let teaching = await getTeachingSubject(locals.user.id, subjectId)

			if (teaching.length > 0 && teaching[0].teacher) {
				await updateTeaching(teaching[0].id, subjectId, locals.user.id, price)

				let returnObj = {
					result: 'success',
					text: 'Změna úspěšně uložena!'
				}
				return returnObj
			} else {
				await setTeaching(subjectId, locals.user.id, price)

				let returnObj = {
					result: 'success',
					text: 'Předmět přidán!'
				}
				return returnObj
			}
		} catch (err) {
			let returnObj = {
				result: 'error',
				text: 'Interní chyba serveru'
			}
			return returnObj
		}
	}
}
