import bcrypt from 'bcrypt'
import { getUserEmail, updateUser } from '$db/user'
import { nameVal, emailVal, passwordVal } from '$util/validate.js'
import { jwtToken } from '$util/createJwt.js'

export const load = async ({ locals }) => {
	return {
		user: locals.user
	}
}

export const actions = {
	saveDetails: async ({ request, locals, cookies, getClientAddress }) => {
		let formData = await request.formData()
		let name = formData.get('name')
		let email = formData.get('email')
		let password = formData.get('password')

		let validation = {
			name: '',
			email: '',
			password: ''
		}

		validation.name = nameVal(name)
		validation.email = emailVal(email)
		if (password !== '') {
			validation.password = passwordVal(password)
		}

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
			let emailsInDB = await getUserEmail(email)

			if (emailsInDB == null || emailsInDB === 'error') throw new Error()

			if (emailsInDB?.length > 0 && locals?.user?.email !== email) {
				let returnObj = {
					result: 'error',
					text: 'Email je používán'
				}

				return returnObj
			}

			let returnObj

			if (password === '') {
				await updateUser(locals.user.id, email, name)

				returnObj = {
					result: 'success',
					text: 'Změna úspěšně uložena!'
				}
			} else {
				returnObj = await new Promise(resolve => {
					bcrypt.hash(password, 10, async (err, hash) => {
						if (err) throw err

						await updateUser(locals.user.email, email, name, hash)

						returnObj = {
							result: 'success',
							text: 'Změna úspěšně uložena!'
						}
						resolve(returnObj)
					})
				})
			}

			let tokenDuration = 60 * 60

			let token = jwtToken(
				locals?.user?.id,
				email,
				name,
				locals?.user?.isTeacher,
				tokenDuration,
				getClientAddress()
			)

			cookies.set('AuthorizationToken', `Bearer ${token}`, {
				path: '/',
				sameSite: 'lax',
				maxAge: tokenDuration
			})
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
