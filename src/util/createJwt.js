import jwt from 'jsonwebtoken'
if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}

export const jwtToken = (
	id = 0,
	email = '',
	name = '',
	isTeacher = false,
	duration = 60 * 60,
	ip = ''
) => {
	let token = jwt.sign(
		{
			id,
			email,
			name,
			isTeacher,
			ip
		},
		process.env.JWT_TOKEN,
		{ expiresIn: duration }
	)
	return token
}

export const jwtTokenAdmin = (name = '', admin = true, duration = 60 * 60, ip = '') => {
	let token = jwt.sign(
		{
			name,
			admin,
			ip
		},
		process.env.JWT_TOKEN,
		{ expiresIn: duration }
	)
	return token
}
