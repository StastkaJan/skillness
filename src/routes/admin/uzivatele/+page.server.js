import { getUsers, getAllUserId, getUserEmail, updateUser } from '$db/user'
import { nameVal, emailVal, passwordVal, activeUserVal } from '$util/validate'

export const load = async ({ locals }) => {
	return {
		users: await getUsers(),
		admin: locals.admin
	}
}

export const actions = {
	saveUser: async ({ request }) => {
		let formData = await request.formData()
		let id = formData.get('id')
		let name = formData.get('name')
		let email = formData.get('email')
		let password = formData.get('password')
		let active = formData.get('active')

		let validation = {
			name: '',
			email: '',
			password: '',
			active: ''
		}

		validation.name = nameVal(name)
		validation.email = emailVal(email)
		if (password.length > 0) {
			validation.password = passwordVal(password)
		}
		validation.active = activeUserVal(active)

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
			let userId = await getAllUserId(id)
			if (userId?.length < 1) {
				let returnObj = {
					result: 'error',
					text: 'Uživatel nenalezen'
				}
				return returnObj
			}

			let userEmail = await getUserEmail(email)
			if (userEmail?.length > 0 && userEmail[0].id != id) {
				let returnObj = {
					result: 'error',
					text: 'Uživatel s emailem již existuje'
				}
				return returnObj
			}

			await updateUser(id, email, name, password, active)
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
	}
}
