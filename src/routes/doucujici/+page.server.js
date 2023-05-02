import { getAllTeachersWhere } from '$db/teacher'

export const load = async ({ locals, url }) => {
	let params = url.searchParams.toString()
	let res = await getAllTeachersWhere('', '')

	return {
		teachers: res,
		user: locals.user
	}
}
