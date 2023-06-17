import { serialize } from 'cookie'

export const DELETE = async ({ request }) => {
	try {
		let status = 200
		let returnObj = {
			result: 'success',
			text: 'Odhlášení proběhlo úspěšně!'
		}

		let response = new Response(JSON.stringify(returnObj), { status })
		response.headers.set(
			'Set-Cookie',
			serialize('AuthorizationToken', '', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 0
			})
		)
		return response
	} catch (err) {
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
