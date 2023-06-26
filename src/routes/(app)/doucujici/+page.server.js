import { getAllTeachersWhere } from '$db/teacher'
import { getFaculties, getFaculty } from '$db/faculty'
import { getAllUnis, getUni } from '$db/uni'
import { getSubjects } from '$db/subject'

let search = ''
let faculty = ''
let uni = ''
let subject = ''
let price = 1000

export const load = async ({ locals, url }) => {
	search = url?.searchParams?.get('search') || ''
	faculty = url?.searchParams?.get('faculty') || ''
	uni = url?.searchParams?.get('uni') || ''
	subject = url?.searchParams?.get('subject') || ''
	price = url?.searchParams?.get('price') || 1000

	let res = await getAllTeachersWhere(search, price, subject, faculty, uni)
	let subjects = await getSubjects()
	let faculties = await getFaculties()
	let unis = await getAllUnis()

	return {
		search,
		subjects,
		subject,
		unis,
		uni,
		faculties,
		faculty,
		teachers: res,
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
