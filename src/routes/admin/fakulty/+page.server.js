import { getUnis, getUni } from '$db/uni'
import { getFaculties, getFaculty, setFaculty, updateFaculty, deleteFaculty } from '$db/faculty'
import { nameVal, shortnameVal } from '$util/validate'

export const load = async ({ locals }) => {
	return {
		unis: await getUnis(),
		faculties: await getFaculties(),
		admin: locals.admin
	}
}

export const actions = {
	saveFaculty: async ({ request }) => {
		let formData = await request.formData()
		let id = formData.get('id')
		let name = formData.get('name')
		let shortname = formData.get('shortname')
		let uni = formData.get('uni')

		let validation = {
			name: '',
			shortname: ''
		}

		validation.name = nameVal(name)
		validation.shortname = shortnameVal(shortname)

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
			let unis = await getUni(uni)
			if (unis?.length < 1) {
				let returnObj = {
					result: 'error',
					text: 'Univerzita nenalezena'
				}
				return returnObj
			}

			if (id > 0) {
				let faculty = await getFaculty(id)
				if (faculty?.length < 1) {
					let returnObj = {
						result: 'error',
						text: 'Fakulta nenalezena'
					}
					return returnObj
				}

				await updateFaculty(id, uni, name, shortname)
				let returnObj = {
					result: 'success',
					text: 'Úspěšně uloženo'
				}
				return returnObj
			}

			await setFaculty(uni, name, shortname)
			let returnObj = {
				result: 'success',
				text: 'Úspěšně uloženo'
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
	},
	deleteFaculty: async ({ request }) => {
		let formData = await request.formData()
		let id = formData.get('id')

		try {
			if (id > 0) {
				let uni = await getFaculty(id)
				if (uni?.length < 1) {
					let returnObj = {
						result: 'error',
						text: 'Fakulta nenalezena'
					}
					return returnObj
				}

				await deleteFaculty(id)
				let returnObj = {
					result: 'success',
					text: 'Úspěšně smazáno'
				}
				return returnObj
			}

			let returnObj = {
				result: 'error',
				text: 'Neplatné číslo fakulty'
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
