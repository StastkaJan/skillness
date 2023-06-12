import { getTeacherSite } from '$db/teacher'
import { getTeachings } from '$db/teaching'
import { getTimetableDate } from '$db/timetable'
import { error } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	let teacher = await getTeacherSite(params.site)

	if (!teacher) {
		throw error(404)
	}

	let teaching = await getTeachings(teacher.id)
	let timetable = await getTimetableDate(teacher.id)

	return {
		teacher,
		timetable,
		teaching,
		user: locals.user
	}
}
