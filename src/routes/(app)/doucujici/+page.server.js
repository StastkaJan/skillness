import { getAllTeachersWhere } from '$db/teacher'

export const load = async ({ locals, url }) => {
	let subject = url.searchParams.get('subject')
	let res = await getAllTeachersWhere('', subject)

	return {
		teachers: res,
		user: locals.user
	}
}
