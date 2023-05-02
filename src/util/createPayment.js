if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}
import { setPayment } from '$db/payment'
import crypto from 'crypto'

let proid = process.env.payproid
let shoid = process.env.payshoid
let pass = process.env.paypass

export const getPaymentUrl = async (id = '') => {
	let date = new Date()
	let hash = createHash(date)
	let payGate = await fetch(
		`https://api.thepay.cz/v1/projects/${proid}/payments/${id}?merchant_id=${shoid}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Signature: hash,
				SignatureDate: date.toUTCString()
			}
		}
	)
	let json = await payGate.json()
	return json
}

export const createPaymentUrl = async (user = {}, amount = 0, url) => {
	let uid = crypto.randomUUID()
	let date = new Date()
	let hash = createHash(date)

	await setPayment(
		uid,
		user.id || 0,
		date.toISOString().replace('T', ' ').replace(/\..+/, ''),
		'W',
		amount
	)

	let payGate = await fetch(
		`https://api.thepay.cz/v1/projects/${proid}/payments?merchant_id=${shoid}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Signature: hash,
				SignatureDate: date.toUTCString()
			},
			body: JSON.stringify({
				is_deposit: true,
				can_customer_change_method: true,
				payment_method_code: 'card',
				amount: amount * 100,
				currency_code: 'CZK',
				uid,
				return_url: `${url.protocol}//${url.host}/profil/stav/platba`,
				is_customer_notification_enabled: false,
				save_authorization: false,
				language_code: 'cs',
				customer: {
					name: user.name,
					email: user.email
				}
			})
		}
	)

	let res = await payGate.json()
	return res
}

const createHash = (date = new Date()) => {
	let hash = crypto
		.createHash('sha256')
		.update(shoid + pass + date.toUTCString())
		.digest('hex')
	return hash
}
