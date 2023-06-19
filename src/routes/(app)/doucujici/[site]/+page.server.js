import { getTeacherSite } from '$db/teacher'
import { getTeachings } from '$db/teaching'
import { getTimetableDates } from '$db/timetable'
import { error } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	let teacher = await getTeacherSite(params.site)

	if (!teacher) {
		throw error(404)
	}

	let teaching = await getTeachings(teacher.id)
	let timetable = await getTimetableDates(teacher.id)

	return {
		teacher,
		timetable,
		teaching,
		user: locals.user,
		site: params.site
	}
}
