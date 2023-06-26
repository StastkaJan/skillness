import { getAllSubjectsOpt } from '$db/subject'

export const load = async ({ locals, url }) => {
	let res = await getAllSubjectsOpt(url.searchParams)

	return {
		subjects: res,
		user: locals.user
	}
}

export const actions = {
	loadMore: async ({ request }) => {
		let formData = await request.formData()
		let offset = formData.get('offset')

		if (!Number(offset) && offset != 0) {
			return {
				result: 'error',
				text: 'Došlo k chybě'
			}
		}

		let unis = await getAllSubjectsOpt(search || '', offset, 20)
		return {
			result: 'success',
			data: unis,
			offset
		}
	}
}
