import { getUserLessons, getLesson } from '$db/lesson'
import { descriptionVal, scoreVal } from '$util/validate'
import { setReview } from '$db/review'

export const load = async ({ locals }) => {
	return {
		lessons: await getUserLessons(locals?.user?.id),
		user: locals.user
	}
}

export const actions = {
	sendReview: async ({ request, locals }) => {
		let formData = await request.formData()
		let lessonId = formData.get('lesson')
		let score = formData.get('score')
		let description = formData.get('description')

		let validation = {
			score: 0,
			description: ''
		}

		validation.score = scoreVal(score)
		validation.description = descriptionVal(description)

		Object.keys(validation).forEach(key => {
			if (validation[key] === '') {
				delete validation[key]
			}
		})

		if (Object.keys(validation).length > 0) {
			let returnObj = {
				result: 'error',
				text: validation[Object.keys(validation)[0]]
			}
			return returnObj
		}

		let lessonExist = await getLesson(lessonId)

		if (lessonExist?.length < 1) {
			let returnObj = {
				result: 'error',
				text: 'Zadáno neplatné ID hodiny'
			}
			return returnObj
		}

		if (lessonExist[0].user != locals?.user?.id) {
			let returnObj = {
				result: 'error',
				text: 'Na to nemáš oprávnění'
			}
			return returnObj
		}

		if (lessonExist[0].review != null) {
			let returnObj = {
				result: 'error',
				text: 'Hodina již byla ohodnocena'
			}
			return returnObj
		}

		if (new Date(lessonExist[0].start) > new Date()) {
			let returnObj = {
				result: 'error',
				text: 'Hodina ještě neproběhla'
			}
			return returnObj
		}

		if (new Date(lessonExist[0].status != 'T') > new Date()) {
			let returnObj = {
				result: 'error',
				text: 'Nelze hodnotit neproběhlou hodinu'
			}
			return returnObj
		}

		let reviewResp = await setReview(lessonId, score, description)

		if (reviewResp?.length < 1) {
			let returnObj = {
				result: 'error',
				text: 'Při ukládání došlo k chybě'
			}
			return returnObj
		}

		let returnObj = {
			result: 'success',
			text: 'Recenze uložena'
		}
		return returnObj
	}
}
