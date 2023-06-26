import { getAllSubjectsOpt } from '$db/subject'
import { getFaculties, getFaculty } from '$db/faculty'
import { getAllUnis, getUni } from '$db/uni'

let search = ''
let faculty = ''
let uni = ''

export const load = async ({ locals, url }) => {
	search = url?.searchParams?.get('search') || ''
	faculty = url?.searchParams?.get('faculty') || ''
	uni = url?.searchParams?.get('uni') || ''

	let subjects = await getAllSubjectsOpt(faculty, uni, search, 0, 20)
	let faculties = await getFaculties()
	let unis = await getAllUnis()

	return {
		unis,
		uni,
		faculties,
		faculty,
		offset: 0,
		search,
		subjects,
		user: locals.user
	}
}

export const actions = {
	loadMore: async ({ request }) => {
		let formData = await request.formData()
		let offset = formData.get('offset')
		let faculty = formData.get('faculty')
		let uni = formData.get('uni')

		if (!Number(offset) && offset != 0) {
			return {
				result: 'error',
				text: 'Došlo k chybě'
			}
		}

		let facultyDB = getFaculty(faculty)
		if (facultyDB.length < 1) {
			return {
				result: 'error',
				text: 'Fakulta nenalezena'
			}
		}

		let uniDB = getUni(uni)
		if (uniDB.length < 1) {
			return {
				result: 'error',
				text: 'Fakulta nenalezena'
			}
		}

		let subjects = await getAllSubjectsOpt(faculty, uni, search, offset, 20)
		return {
			result: 'success',
			data: subjects,
			offset
		}
	}
}
