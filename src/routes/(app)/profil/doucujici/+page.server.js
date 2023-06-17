import { getTeacherId, setTeacher, updateTeacher, getTeacherSite } from '$db/teacher'
import { activeVal, siteVal, bioVal, nameVal } from '$util/validate'
import { jwtToken } from '$util/createJwt'

export const load = async ({ locals }) => {
	let teacher = await getTeacherId(locals.user.id)

	return {
		teacher: teacher[0],
		user: locals.user
	}
}

export const actions = {
	saveDetails: async ({ request, locals, cookies, getClientAddress }) => {
		let formData = await request.formData()
		let active = formData.get('active')
		let site = formData.get('site')
		let bio = formData.get('bio')
		let img = formData.get('imgText')
		let location = formData.get('location')

		if (active == null) {
			active = 'F'
		} else {
			active = 'T'
		}

		let validation = {
			active: '',
			site: '',
			bio: '',
			location: ''
		}

		validation.active = activeVal(active)
		validation.site = siteVal(site)
		validation.bio = bioVal(bio)
		validation.location = nameVal(location)

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

		try {
			let sites = await getTeacherSite(site)

			if (sites?.name && sites.id !== locals?.user?.id) {
				let returnObj = {
					result: 'error',
					text: 'Adresa je používána'
				}
				return returnObj
			}

			let teacher = await getTeacherId(locals?.user?.id)

			if (teacher.length > 0) {
				await updateTeacher(locals?.user?.id, site, location, bio, active, img)

				let returnObj = {
					result: 'success',
					text: 'Změna úspěšně uložena!'
				}
				return returnObj
			} else {
				await setTeacher(locals?.user?.id, site, location, bio, active, img)

				let tokenDuration = 60 * 60

				let token = jwtToken(
					locals.user?.id,
					locals.user?.email,
					locals.user?.name,
					true,
					tokenDuration,
					getClientAddress()
				)

				cookies.set('AuthorizationToken', `Bearer ${token}`, {
					path: '/',
					sameSite: 'lax',
					maxAge: tokenDuration
				})

				let returnObj = {
					result: 'success',
					text: 'Profil učitele vytvořen!'
				}
				return returnObj
			}
		} catch (err) {
			console.log(err)
			let returnObj = {
				result: 'error',
				text: 'Chyba serveru'
			}
			return returnObj
		}
	}
}
