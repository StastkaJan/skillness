import { getTimetableDate, deleteTimetable, setTimetable } from '$db/timetable'

export const POST = async ({ request, locals }) => {
	let timetable = await request.json()

	let timetableDB = await getTimetableDate(locals.user.id)
	let toSet = timetable.filter(n => {
		return !timetableDB
			.map(b => {
				return new Date(b.start).toUTCString()
			})
			.includes(new Date(n.start).toUTCString())
	})
	let toDelete = timetableDB.filter(n => {
		return !timetable
			.map(b => {
				return new Date(b.start).toUTCString()
			})
			.includes(new Date(n.start).toUTCString())
	})

	timetable = timetable.filter(e => {
		let curr = new Date()
		curr.setHours(22, 0, 0, 0)
		let tomorrow = new Date(curr.setDate(curr.getDay() + 1))
		return new Date(e.start) > new Date(tomorrow)
	})

	try {
		await deleteTimetable(locals.user.id, toDelete)
		await setTimetable(locals.user.id, toSet)

		let status = 200
		let returnObj = {
			result: 'success',
			text: 'Úspěšně uloženo!'
		}
		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		console.log(err)
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
