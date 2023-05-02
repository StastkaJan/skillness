import { getTimetable } from '$db/timetable'

export const load = async ({ locals }) => {
	let timetable = await getTimetable(locals.user.id)

	return {
		timetable,
		user: locals.user
	}
}
