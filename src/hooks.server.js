import jwt from 'jsonwebtoken'
import { redirect } from '@sveltejs/kit'
if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}

export const handle = async ({ event, resolve }) => {
	if (
		process.env.NODE_ENV !== 'development' &&
		event.request.headers.get('x-forwarded-proto') === 'http'
	) {
		throw redirect(301, `https://${event.url.host}/${event.url.pathname}${event.url.search}`)
	}

	let token = event.cookies.get('AuthorizationToken') || ''

	let user = await verifyToken(token.split(' ')[1], process.env.JWT_TOKEN)

	if (event.url.pathname.startsWith('/profil') && !user?.email) {
		throw redirect(307, '/')
	}

	event.locals.user = null

	if (user.email) {
		event.locals.user = {
			id: user.id,
			email: user.email,
			name: user.name,
			isTeacher: user.isTeacher || false
		}
	}

	const response = await resolve(event)

	response.headers.set('X-Frame-Options', 'SAMEORIGIN')
	response.headers.set('X-Content-Type-Options', 'nosniff')
	response.headers.set('X-Xss-Protection', '1; mode=block')
	response.headers.set('Referrer-Policy', 'no-referrer')
	response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
	response.headers.set('Permissions-Policy', 'geolocation=(self)')
	response.headers.set(
		'Cross-Origin-Embedder-Policy',
		'(unsafe-none|require-corp); report-to="default"'
	)
	response.headers.set(
		'Cross-Origin-Opener-Policy',
		'(same-origin|same-origin-allow-popups|unsafe-none); report-to="default"'
	)
	response.headers.set('Cross-Origin-Resource-Policy', '(same-site|same-origin|cross-origin)')

	if (event.url.pathname.startsWith('/font')) {
		response.headers.set('Cache-Control', 'max-age=604800, must-revalidate')
	} else {
		response.headers.set('Cache-Control', 'max-age=1800, must-revalidate')
	}

	return response
}

async function verifyToken(token, key) {
	if (!token) return {}
	return new Promise((resolve, reject) =>
		jwt.verify(token, key, (err, decoded) => (err ? reject({}) : resolve(decoded)))
	)
}
