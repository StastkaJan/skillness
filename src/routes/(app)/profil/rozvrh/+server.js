import { getTimetableDate, deleteTimetable, setTimetable } from '$db/timetable'

export const POST = async ({ request, locals }) => {
	let timetable = await request.json()

	let date = new Date()

	// looks for dates that are before tomorrow
	let wrongDates = timetable.filter(e => {
		return (
			new Date(e.start) == 'Invalid Date' ||
			new Date(e.start) < new Date(date.setDate(date.getDate() + 1))
		)
	})
	if (wrongDates.length > 0) {
		let status = 200
		let returnObj = {
			result: 'error',
			text: 'Vloženo neplatné datum'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}

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
		if (toDelete.length > 0) {
			await deleteTimetable(toDelete)
		}
		if (toSet.length > 0) {
			await setTimetable(locals.user.id, toSet)
		}

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
