import bcrypt from 'bcrypt'
import { getAdmin } from '$db/admin'
import { jwtTokenAdmin } from '$util/createJwt'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	return {
		admin: locals.admin
	}
}

export const actions = {
	login: async ({ request, locals, cookies, getClientAddress }) => {
		if (locals.user.id) {
			return {}
		}
		let formData = await request.formData()
		let name = formData.get('name')
		let password = formData.get('password')

		try {
			let res = await getAdmin(name)

			if (res.length < 1) {
				let returnObj = {
					result: 'error',
					text: 'Zadané údaje se neshodují'
				}
				return returnObj
			}

			let user = res[0]

			let compare = await bcrypt.compare(password, user.password)

			if (compare) {
				let returnObj = {
					result: 'success',
					text: 'Přihlášení proběhlo úspěšně!'
				}

				let response = returnObj

				let tokenDuration = 60 * 60

				let token = jwtTokenAdmin(user?.name, true, tokenDuration, await getClientAddress())

				cookies.set('AuthorizationToken', `Bearer ${token}`, {
					path: '/',
					sameSite: 'lax',
					maxAge: tokenDuration
				})

				return response
			}

			let returnObj = {
				result: 'error',
				text: 'Zadané údaje se neshodují'
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
