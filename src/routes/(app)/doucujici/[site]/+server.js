import { getTeacherSite } from '$db/teacher'
import { getTeaching } from '$db/teaching'
import { getTimetableById, getTimetableTimes } from '$db/timetable'
import { insertLesson } from '$db/lesson'

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
	console.log(teaching, timetable)

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
		console.log(timetableCheck)
		if (!timetableCheck[0]) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Čas v rozvrhu nenalezen'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		let teachingCheck = await getTeaching(teaching)
		console.log(teachingCheck)
		if (!teachingCheck[0]) {
			let status = 403
			let returnObj = {
				result: 'error',
				text: 'Předmět nenalezen'
			}
			return new Response(JSON.stringify(returnObj), { status })
		}

		await insertLesson(locals?.user?.id, timetable, teaching)

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
