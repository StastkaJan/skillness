import { getUserPayment, getBalance, updatePayment, setPaymentWithdraw } from '$db/payment'
import { createPaymentUrl, getPaymentUrl } from '$util/createPayment'
import { sumVal, accountVal } from '$util/validate'
import { insertWithdraw } from '$db/withdraw'

export const load = async ({ locals, url }) => {
	let returnObj = {
		result: url.searchParams.get('result'),
		text: url.searchParams.get('text')
	}

	let payments = await getUserPayment(locals?.user?.id)
	let balance = await getBalance(locals?.user?.id)
	let paymentChage = false

	payments.forEach(async item => {
		if (item.paid != 'W' || new Date(Number(new Date(item.timestamp)) + 12096e5) <= new Date()) {
			return
		}
		let payment = await getPaymentUrl(item.payment)

		if (payment.state == 'expired') {
			let update = await updatePayment(item.payment, 'F')
			paymentChage = true
		}

		if (payment.state == 'paid') {
			let update = await updatePayment(item.payment, 'T')
			paymentChage = true
		}
	})

	if (paymentChage) {
		payments = await getUserPayment(locals?.user?.id)
		balance = await getBalance(locals?.user?.id)
	}

	return {
		returnObj,
		balance: balance[0],
		user: locals.user,
		payments
	}
}

export const actions = {
	pay: async ({ request, locals, url }) => {
		let formData = await request.formData()
		let amount = formData.get('amount')

		amount = Number(amount)
		if (typeof amount !== 'number' || amount < 0) {
			let returnObj = {
				result: 'error',
				text: 'Zadána neplatná částka'
			}
			return returnObj
		}

		try {
			let res = await createPaymentUrl(locals?.user, amount, url)

			if (res.pay_url) {
				let returnObj = {
					result: 'success',
					text: 'Úspěch!',
					paymentUrl: res.pay_url
				}
				return returnObj
			}

			let returnObj = {
				result: 'error',
				text: 'Došlo k chybě, zkuste to později.'
			}
			return returnObj
		} catch (err) {
			console.log(err)
			let returnObj = {
				result: 'error',
				text: 'Chyba serveru'
			}
			return returnObj
		}
	},
	saveWithdraw: async ({ request, locals, url }) => {
		let formData = await request.formData()
		let sum = formData.get('sum')
		let account = formData.get('account')

		let validation = {
			sum: '',
			account: ''
		}

		validation.sum = sumVal(sum)
		validation.account = accountVal(account)

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
			let balance = await getBalance(locals?.user?.id)

			if (!balance[0]?.sum) {
				let returnObj = {
					result: 'error',
					text: 'Nenalezen záznam o stavu účtu'
				}
				return returnObj
			}

			if (Number(balance[0]?.sum) < Number(sum)) {
				let returnObj = {
					result: 'error',
					text: 'Nelze vybrat větší částku než je stav účtu'
				}
				return returnObj
			}

			let payment = await setPaymentWithdraw(
				locals?.user?.id,
				new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
				'T',
				-sum
			)

			if (payment.length < 1 || !payment[0].id) {
				let returnObj = {
					result: 'error',
					text: 'Při ukládání došlo k chybě'
				}
				return returnObj
			}

			let withdraw = await insertWithdraw(locals?.user?.id, sum, account)

			if (withdraw.length < 1 || !withdraw[0].id) {
				let returnObj = {
					result: 'error',
					text: 'Při ukládání došlo k chybě'
				}
				return returnObj
			}

			let returnObj = {
				result: 'success',
				text: 'Úspěšně odesláno'
			}
			return returnObj
		} catch (err) {
			console.log(err)
			let returnObj = {
				result: 'error',
				text: 'Chyba serveru'
			}
			return returnObj
		}
	}
}
