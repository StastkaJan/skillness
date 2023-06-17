import { getUniFaculties } from '$db/faculty'

export const GET = async ({ url }) => {
	try {
		let faculty = await getUniFaculties(url.searchParams.get('uni'))

		let status = 200
		let returnObj = {
			result: 'success',
			faculty
		}
		return new Response(JSON.stringify(returnObj), { status })
	} catch (err) {
		console.log(err)
		let status = 500
		let returnObj = {
			result: 'error',
			text: 'Interní chyba serveru'
		}
		return new Response(JSON.stringify(returnObj), { status })
	}
}
