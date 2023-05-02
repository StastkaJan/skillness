import bcrypt from 'bcrypt'
import { jwtToken } from '$util/createJwt.js'
import { getUserEmail, setUser } from '$db/user'
import { nameVal, emailVal, passwordVal, consentVal } from '$util/validate.js'

export const POST = async ({ request, cookies, getClientAddress }) => {
	let formData = await request.formData()
	let name = formData.get('name')
	let email = formData.get('email')
	let password = formData.get('password')
	let consent = formData.get('consent')

	let validation = {
		name: '',
		email: '',
		password: '',
		consent: ''
	}

	validation.name = nameVal(name)
	validation.email = emailVal(email)
	validation.password = passwordVal(password)
	validation.consent = consentVal(consent)

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
		let emailsInDB = await getUserEmail(email)

		if (emailsInDB == null || emailsInDB === 'error') throw new Error()

		if (emailsInDB.length > 0) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Email je používán'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let resDB = await new Promise(resolve => {
			bcrypt.hash(password, 10, async (err, hash) => {
				if (err) throw err

				resolve(await setUser(email, name, hash))
			})
		})

		let returnObj = {
			result: 'success',
			text: 'Registrace proběhla úspěšně!'
		}

		let response = new Response(JSON.stringify(returnObj), { status: 200 })

		let tokenDuration = 60 * 60

		let token = jwtToken(resDB[0]?.id, email, name, false, tokenDuration, await getClientAddress())

		cookies.set('AuthorizationToken', `Bearer ${token}`, {
			path: '/',
			sameSite: 'lax',
			maxAge: tokenDuration
		})
		return response
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
