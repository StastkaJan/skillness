import { getUnis } from '$db/uni'

let search

export const load = async ({ locals, url }) => {
	search = url?.searchParams?.get('search')
	let unis = await getUnis(search || '', 0, 20)

	return {
		offset: 0,
		search,
		unis,
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

		let unis = await getUnis(search || '', offset, 20)
		return {
			result: 'success',
			data: unis,
			offset
		}
	}
}
