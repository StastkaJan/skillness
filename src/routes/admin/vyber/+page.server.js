import { getAll } from '$db/withdraw'

export const load = async ({ locals }) => {
	return {
		withdraw: await getAll(),
		admin: locals.admin
	}
}
