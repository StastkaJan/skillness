import { getTeacherSite } from '$db/teacher'
import { getTeaching } from '$db/teaching'
import { getTimetableById, getTimetableTimes } from '$db/timetable'
import { insertLesson, deleteLesson } from '$db/lesson'
import { getBalance, setPaymentLesson, deletePayment } from '$db/payment'
import { sendMail } from '$util/mailer'
if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}

export const GET = async ({ request, params, locals, url }) => {
	try {
		if (!locals?.user?.id) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Nejdřív se přihlas'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let teacher = await getTeacherSite(params.site)
		if (!teacher?.id) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Doučující nenalezen'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		if (locals?.user?.id == teacher?.id) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Nelze doučovat sám sebe'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let date = new Date(url.searchParams.get('date'))
		let start = new Date(url.searchParams.get('date'))
		let end = new Date(date.setDate(start.getDate() + 1))

		let times = await getTimetableTimes(teacher.id, start, end)

		if (!times[0]) {
			let status = 200
			let returnObj = {
				result: 'error',
				text: 'Nenalezen žádný čas',
				times
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let status = 200
		let returnObj = {
			result: 'success',
			text: 'Úspěšně uloženo',
			times
		}
		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}

export const POST = async ({ request, params, locals }) => {
	let { teaching, timetable } = await request.json()

	try {
		if (!locals?.user?.id) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Nejdřív se přihlas'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let teacher = await getTeacherSite(params.site)
		if (!teacher?.id) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Doučující nenalezen'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		if (locals?.user?.id == teacher?.id) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Nelze doučovat sám sebe'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let timetableCheck = await getTimetableById(timetable)
		if (!timetableCheck[0]) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Čas v rozvrhu nenalezen'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let teachingCheck = await getTeaching(teaching)
		if (!teachingCheck[0]) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Předmět nenalezen'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let balanceCheck = await getBalance(locals?.user?.id)
		if (Number(balanceCheck[0]?.sum) < teachingCheck[0]?.price) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Nedostatek kreditů.'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let date = new Date(timetableCheck[0]?.start)

		let lessonInsert = await insertLesson(locals?.user?.id, timetable, teaching)

		if (!lessonInsert[0]?.id) {
			let status = 500
			let returnObj = {
				result: 'error',
				text: 'Chyba při ukládání'
			}

			return new Response(JSON.stringify(returnObj), { status })
		}

		let payment = await setPaymentLesson(
			lessonInsert[0]?.id,
			locals?.user?.id,
			new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
			'T',
			-teachingCheck[0]?.price
		)

		if (!payment[0]?.id) {
			let status = 500
			let returnObj = {
				result: 'error',
				text: 'Chyba při ukládání'
			}

			await deleteLesson(lessonInsert[0].id)

			return new Response(JSON.stringify(returnObj), { status })
		}

		let paymentTeacher = await setPaymentLesson(
			lessonInsert[0]?.id,
			teacher?.id,
			new Date(date.setDate(date.getDate() + 7))
				.toISOString()
				.replace('T', ' ')
				.replace(/\..+/, ''),
			'T',
			Number(teachingCheck[0]?.price) * (1 - process.env.feePercent / 100)
		)

		if (!paymentTeacher[0]?.id) {
			let status = 500
			let returnObj = {
				result: 'error',
				text: 'Chyba při ukládání'
			}

			await deletePayment(payment[0].id)

			await deleteLesson(lessonInsert[0].id)

			return new Response(JSON.stringify(returnObj), { status })
		}

		await sendMail(
			teacher.email,
			'Nová přihláška na hodinu | Skillnes',
			`
<!DOCTYPE html>
<html lang="cs">
  <head></head>
  <body>
    <table>
      <tr>
        <td align="center">
          <h1>Nová přihláška na hodinu</h1>
          <p>
            Právě ti přišla nová přihláška na hodinu. Přihlaš se a potvrď ji.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`
		)

		let status = 200
		let returnObj = {
			result: 'success',
			text: 'Úspěšně uloženo'
		}

		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
