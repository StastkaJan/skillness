import { getTeacherSite } from '$db/teacher'
import { getTeaching } from '$db/teaching'
import { getTimetableDate } from '$db/timetable'
import { insertLesson } from '$db/lesson'

export const POST = async ({ request, params, locals }) => {
	let { teacher, selectedSubject, selectedTime } = await request.json()

	try {
		if (!locals?.user?.id) {
			let status = 403
			return new Response(JSON.stringify(returnObj), { status })
		}

		let date = new Date(selectedTime.date.match(/\d{4}(-\d{2}){2}/)[0] + ' ' + selectedTime.time)
			.toISOString()
			.replace('T', ' ')
			.replace(/\..+/, '')

		await insertLesson(date, teacher, String(session.userId), selectedSubject)

		returnObj.status = 200
		returnObj.body = {
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
