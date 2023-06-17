import { getIdPayment } from '$db/payment'
import { getPaymentUrl } from '$util/createPayment'

export const POST = async ({ url }) => {
	try {
		let id = url.searchParams.get('id')

		let payment = await getIdPayment(id)

		if (payment.length < 1 || !payment[0].payment) {
			let status = 404
			let returnObj = {
				result: 'error',
				text: 'Platba nenalezena'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let payGateJson = await getPaymentUrl(payment[0].payment)

		if (payGateJson && !payGateJson.message) {
			let status = 200
			let returnObj = {
				result: 'success',
				text: 'Úspěch!',
				paymentUrl: payGateJson.pay_url
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let status = 404
		let returnObj = {
			result: 'error',
			text: 'Platba nenalezena'
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
