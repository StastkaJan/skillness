import bcrypt from 'bcrypt'
import { emailVal, passwordVal } from '$util/validate.js'
import { getUserEmail } from '$db/user'
import { getTeacherId } from '$db/teacher'
import { jwtToken } from '$util/createJwt'

export const POST = async ({ request, cookies, getClientAddress }) => {
	let formData = await request.formData()
	let email = formData.get('email')
	let password = formData.get('password')

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
		let status = 400
		let returnObj = {
			result: 'error',
			text: validation[Object.keys(validation)[0]]
		}
		return new Response(JSON.stringify(returnObj), { status })
	}

	try {
		let res = await getUserEmail(email)

		if (res.length < 1) {
			let status = 404
			let returnObj = {
				result: 'error',
				text: 'Zadané údaje se neshodují'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let user = res[0]
		let teach = await getTeacherId(user.id)

		let compare = await bcrypt.compare(password, user.password)

		if (compare) {
			let status = 200
			let returnObj = {
				result: 'success',
				text: 'Přihlášení proběhlo úspěšně!'
			}

			let response = new Response(JSON.stringify(returnObj), { status })

			let tokenDuration = 60 * 60

			let token = jwtToken(
				user?.id,
				user?.email,
				user?.name,
				Boolean(teach[0]?.site),
				tokenDuration,
				await getClientAddress()
			)

			cookies.set('AuthorizationToken', `Bearer ${token}`, {
				path: '/',
				sameSite: 'lax',
				maxAge: tokenDuration
			})

			return response
		}

		let status = 400
		let returnObj = {
			result: 'error',
			text: 'Zadané údaje se neshodují'
		}

		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		console.log(err)
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
