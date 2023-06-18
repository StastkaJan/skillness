import { getAllReports } from '$db/report'

export const load = async ({ locals }) => {
	return {
		reports: await getAllReports(),
		admin: locals.admin
	}
}
