import { getUnis, getUni, setUni, updateUni, deleteUni } from '$db/uni'
import { nameVal, urlVal, shortnameVal } from '$util/validate'

export const load = async ({ locals }) => {
	return {
		unis: await getUnis(),
		admin: locals.admin
	}
}

export const actions = {
	saveUni: async ({ request }) => {
		let formData = await request.formData()
		let id = formData.get('id')
		let name = formData.get('name')
		let shortname = formData.get('shortname')
		let logo = formData.get('logo')

		let validation = {
			id: '',
			name: '',
			shortname: '',
			logo: ''
		}

		validation.name = nameVal(name)
		validation.shortname = shortnameVal(shortname)
		validation.logo = urlVal(logo)

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
			if (id > 0) {
				let uni = await getUni(id)
				if (uni?.length < 1) {
					let returnObj = {
						result: 'error',
						text: 'Univerzita nenalezena'
					}
					return returnObj
				}

				await updateUni(id, name, shortname, logo)
				let returnObj = {
					result: 'success',
					text: 'Úspěšně uloženo'
				}
				return returnObj
			}

			await setUni(name, shortname, logo)
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
	deleteUni: async ({ request }) => {
		let formData = await request.formData()
		let id = formData.get('id')

		try {
			if (id > 0) {
				let uni = await getUni(id)
				if (uni?.length < 1) {
					let returnObj = {
						result: 'error',
						text: 'Univerzita nenalezena'
					}
					return returnObj
				}

				await deleteUni(id)
				let returnObj = {
					result: 'success',
					text: 'Úspěšně smazáno'
				}
				return returnObj
			}

			let returnObj = {
				result: 'error',
				text: 'Neplatné číslo univerzity'
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
