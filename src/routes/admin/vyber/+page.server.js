import { getAll } from '$db/withdraw'

export const load = async ({ locals }) => {
	return {
		reports: await getAll(),
		admin: locals.admin
	}
}
