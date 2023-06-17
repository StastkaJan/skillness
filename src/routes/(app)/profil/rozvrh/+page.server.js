import { getTimetableDate } from '$db/timetable'

export const load = async ({ locals }) => {
	let timetable = await getTimetableDate(locals.user.id)

	return {
		timetable,
		user: locals.user
	}
}
