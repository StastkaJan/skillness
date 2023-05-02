import { getAllSubjectsOpt } from '$db/subject'

export const load = async ({ locals, url }) => {
	let res = await getAllSubjectsOpt(url.searchParams)

	return {
		subjects: res,
		user: locals.user
	}
}
