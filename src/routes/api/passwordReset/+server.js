import { sendMail } from '$util/mailer.js'
import { getUserEmail } from '$db/user'
import { createSession } from '$store/serverStore.js'
import crypto from 'crypto'

export const POST = async ({ request, url }) => {
	let formData = await request.formData()
	let email = formData.get('email')

	try {
		let res = await getUserEmail(email)

		if (res.length < 1) {
			let status = 404
			let returnObj = {
				result: 'error',
				text: 'Uživatel nenalezen'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let uuid = crypto.randomUUID()
		let session = createSession(uuid, email)

		if (session.id == '' || session.id == null) {
			let status = 500
			let returnObj = {
				result: 'error',
				text: 'Došlo k chybě'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let mailResponse = await sendMail(
			email,
			'Obnova hesla | Skillnes',
			`
<!DOCTYPE html>
<html lang="cs">
  <head></head>
  <body>
    <table>
      <tr>
        <td align="center">
          <h1>Obnovení hesla</h1>
          <p>
            Pro obnovu hesla pokračujte kliknutím
            <a href="https://${url.host}/zmena-hesla?id=${uuid}">zde</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
      `
		)

		if (mailResponse.success == false) {
			let status = 500
			let returnObj = {
				result: 'error',
				text: 'Došlo k chybě, zkuste to prosím později'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let status = 200
		let returnObj = {
			result: 'success',
			text: 'Odkaz pro obnovu byl odeslán na email'
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
