import { redirect } from '@sveltejs/kit'
import { getSession, removeSession } from '$store/serverStore.js'
import bcrypt from 'bcrypt'
import { updateUser, getUserEmail } from '$db/user'
import { emailVal, passwordVal } from '$util/validate'
import { jwtToken } from '$util/createJwt'
import { getTeacherId } from '$db/teacher'

export async function load({ url }) {
	let session = getSession(url.searchParams.get('id'))

	if (session?.id == null || session.id == '') {
		throw redirect(302, '/')
	}

	return {
		id: url.searchParams.get('id'),
		email: session.email
	}
}

export const actions = {
	change: async ({ request, cookies, getClientAddress }) => {
		let formData = await request.formData()
		let email = formData.get('email')
		let password = formData.get('password')
		let id = formData.get('id')

		let session = getSession(id)

		if (session?.id == null || session.id == '' || session.email !== email) {
			let returnObj = {
				result: 'error',
				text: 'Id nebylo nalezeno'
			}
			return returnObj
		}

		let validation = {
			email: '',
			password: ''
		}

		validation.email = emailVal(email)
		validation.password = passwordVal(password)

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
			let res = await getUserEmail(email)

			if (res.length < 1) {
				let returnObj = {
					result: 'error',
					text: 'Uživatel nenalezen'
				}
				return returnObj
			}

			let user = res[0]
			let teach = await getTeacherId(user.id)

			let returnObj = await new Promise(resolve => {
				bcrypt.hash(password, 10, async (err, hash) => {
					if (err) throw err

					let resDB = await updateUser(user.id, email, user.name, hash)

					let returnObj = {
						result: 'success',
						text: 'Obnova proběhla úspěšně!'
					}
					resolve(returnObj)
				})
			})

			let tokenDuration = 60 * 60

			let token = jwtToken(
				user?.id,
				user?.email,
				user?.name,
				Boolean(teach[0]?.site),
				tokenDuration,
				getClientAddress()
			)

			cookies.set('AuthorizationToken', `Bearer ${token}`, {
				path: '/',
				sameSite: 'lax',
				maxAge: tokenDuration
			})
			removeSession(id)
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
