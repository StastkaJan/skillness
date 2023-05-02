import { getUnis } from '$db/uni'

export const load = async ({ locals }) => {
	let unis = await getUnis()

	return {
		unis,
		user: locals.user
	}
}
