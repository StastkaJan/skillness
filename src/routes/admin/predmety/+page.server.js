import { getFaculties, getFaculty } from '$db/faculty'
import { getSubjects, getSubject, setSubject, updateSubject, deleteSubject } from '$db/subject'
import { nameVal, identVal, descriptionVal } from '$util/validate'

export const load = async ({ locals }) => {
	return {
		faculties: await getFaculties(),
		subjects: await getSubjects(),
		admin: locals.admin
	}
}

export const actions = {
	saveSubject: async ({ request }) => {
		let formData = await request.formData()
		let id = formData.get('id')
		let name = formData.get('name')
		let ident = formData.get('ident')
		let faculty = formData.get('faculty')
		let description = formData.get('description')

		let validation = {
			name: '',
			ident: '',
			description: ''
		}

		validation.name = nameVal(name)
		if (ident.length > 0) {
			validation.ident = identVal(ident)
		}
		validation.description = descriptionVal(description)

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
			let unis = await getFaculty(faculty)
			if (unis?.length < 1) {
				let returnObj = {
					result: 'error',
					text: 'Fakulta nenalezena'
				}
				return returnObj
			}

			if (id > 0) {
				let subject = await getSubject(id)
				if (subject?.length < 1) {
					let returnObj = {
						result: 'error',
						text: 'Předmět nenalezen'
					}
					return returnObj
				}

				await updateSubject(id, faculty, name, description, ident)
				let returnObj = {
					result: 'success',
					text: 'Úspěšně uloženo'
				}
				return returnObj
			}

			await setSubject(faculty, name, description, ident)
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
	deleteSubject: async ({ request }) => {
		let formData = await request.formData()
		let id = formData.get('id')

		try {
			if (id > 0) {
				let uni = await getSubject(id)
				if (uni?.length < 1) {
					let returnObj = {
						result: 'error',
						text: 'Předmět nenalezen'
					}
					return returnObj
				}

				await deleteSubject(id)
				let returnObj = {
					result: 'success',
					text: 'Úspěšně smazáno'
				}
				return returnObj
			}

			let returnObj = {
				result: 'error',
				text: 'Neplatné číslo předmětu'
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
