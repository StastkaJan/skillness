import { getTeacherLessons, updateLesson, getLesson } from '$db/lesson'
import { updatePaymentLesson } from '$db/payment'
import { sendMail } from '$util/nodemailer'

export const load = async ({ locals }) => {
	return {
		lessons: await getTeacherLessons(locals?.user?.id),
		user: locals.user
	}
}

export const actions = {
	confirmLesson: async ({ request, locals }) => {
		let formData = await request.formData()
		let lessonId = formData.get('lesson')

		let lessonExist = await getLesson(lessonId)

		if (lessonExist?.length < 1) {
			let returnObj = {
				result: 'error',
				text: 'Zadáno neplatné ID hodiny'
			}
			return returnObj
		}

		if (lessonExist[0].teacher != locals?.user?.id) {
			let returnObj = {
				result: 'error',
				text: 'Na to nemáš oprávnění'
			}
			return returnObj
		}

		let lessonResp = await updateLesson(lessonId, 'T')

		if (lessonResp?.length < 1) {
			let returnObj = {
				result: 'error',
				text: 'Při ukládání došlo k chybě'
			}
			return returnObj
		}

		await sendMail(
			lessonExist.userEmail,
			'Hodina byla potvrzena | Skillnes',
			`
<!DOCTYPE html>
<html lang="cs">
  <head></head>
  <body>
    <table>
      <tr>
        <td align="center">
          <h1>Hodina byla potvrzena</h1>
          <p>
            Doučující právě potvrdil hodinu.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`
		)

		let returnObj = {
			result: 'success',
			text: 'Hodina potvrzena'
		}
		return returnObj
	},
	denyLesson: async ({ request, locals }) => {
		let formData = await request.formData()
		let lessonId = formData.get('lesson')

		let lessonExist = await getLesson(lessonId)

		if (lessonExist?.length < 1) {
			let returnObj = {
				result: 'error',
				text: 'Zadáno neplatné ID hodiny'
			}
			return returnObj
		}

		if (lessonExist[0].teacher != locals?.user?.id) {
			let returnObj = {
				result: 'error',
				text: 'Na to nemáš oprávnění'
			}
			return returnObj
		}

		let lessonResp = await updateLesson(lessonId, 'F')

		if (lessonResp?.length < 1) {
			let returnObj = {
				result: 'error',
				text: 'Při ukládání došlo k chybě'
			}
			return returnObj
		}

		let paymentResp = await updatePaymentLesson(lessonId, 'F')

		if (paymentResp?.length < 1) {
			let returnObj = {
				result: 'error',
				text: 'Při ukládání došlo k chybě'
			}
			return returnObj
		}

		await sendMail(
			lessonExist.userEmail,
			'Hodina byla odmítnuta | Skillnes',
			`
<!DOCTYPE html>
<html lang="cs">
  <head></head>
  <body>
    <table>
      <tr>
        <td align="center">
          <h1>Hodina byla odmítnuta</h1>
          <p>
            Doučující právě odmítnul hodinu.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`
		)

		let returnObj = {
			result: 'success',
			text: 'Hodina odmítnuta'
		}
		return returnObj
	}
}
