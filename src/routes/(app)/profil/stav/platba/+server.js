if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}
import { getUUIDPayment, updatePayment } from '$db/payment'
import { getPaymentUrl } from '$util/createPayment'

export const GET = async ({ url }) => {
	try {
		let id = url.searchParams.get('payment_uid')

		let payment = await getUUIDPayment(id)

		if (payment.length < 1 || !payment[0].payment) {
			let status = 404
			let returnObj = {
				result: 'error',
				text: 'Platba nenalezena'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let payGateJson = await getPaymentUrl(payment[0].payment)

		if (payGateJson && payGateJson.message) {
			let status = 200
			let returnObj = {
				result: 'error',
				text: payGateJson.message
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		if (payGateJson.stat == 'expired') {
			let update = await updatePayment(id, 'F')

			if (update && update[0] && update[0].id) {
				let status = 302
				let returnObj = {
					result: 'error',
					text: 'Doba platby vypršela'
				}
				return new Response(JSON.stringify(returnObj), {
					status,
					headers: {
						location: `/profil/stav?result=${returnObj.result}&text=${encodeURI(returnObj.text)}`
					}
				})
			}
		}

		if (payGateJson.state != 'paid') {
			let status = 302
			let returnObj = {
				result: 'error',
				text: 'Platba neproběhla'
			}
			return new Response(JSON.stringify(returnObj), {
				status,
				headers: {
					location: `/profil/stav?result=${returnObj.result}&text=${encodeURI(returnObj.text)}`
				}
			})
		}

		let update = await updatePayment(id, 'T')

		if (update && update[0] && update[0].id) {
			let status = 302
			let returnObj = {
				result: 'success',
				text: 'Platba proběhla úspěšně'
			}
			return new Response(JSON.stringify(returnObj), {
				status,
				headers: {
					location: `/profil/stav?result=${returnObj.result}&text=${encodeURI(returnObj.text)}`
				}
			})
		}

		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		console.log(err)
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
