import { DBConnection } from './dbConnect'

let dbName = 'teacher'

export const getAllTeachers = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT site, location, bio, img
        FROM ${dbName}
        WHERE active = 'T'
      `,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getAllTeachersWhere = async (
	text = '',
	price = 1000,
	subject = 0,
	faculty = 0,
	uni = 0
) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
				SELECT "user".name, bio, img, site, AVG(price) as price, AVG(score) as score
				FROM ${dbName}
        	LEFT JOIN public."user" ON public."user".id = ${dbName}.id
					LEFT JOIN teaching ON teaching.teacher = ${dbName}.id
					LEFT JOIN timetable ON timetable.teacher = ${dbName}.id
					LEFT JOIN lesson ON lesson.timetable = timetable.id
					LEFT JOIN review ON review.lesson = lesson.id
					JOIN subject ON subject.id = teaching.subject
					JOIN faculty ON faculty.id = subject.faculty
        WHERE (LOWER(public."user".name) LIKE LOWER($1)
					OR LOWER(bio) LIKE LOWER($1))
					AND ${dbName}.active like 'T'
					${
						subject
							? 'AND teaching.subject = $3'
							: faculty
							? 'AND subject.faculty = $3'
							: uni
							? 'AND faculty.uni = $3'
							: ''
					}
				GROUP BY "user".name, bio, img, site, "user".id
				HAVING AVG(price) < $2
				ORDER BY (SELECT ranking("user".id)) DESC
				`,
			subject
				? [`%${text}%`, price, subject]
				: faculty
				? [`%${text}%`, price, faculty]
				: uni
				? [`%${text}%`, price, uni]
				: [`%${text}%`, price]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getTeacherId = async (id = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT location, bio, img, site, active
        FROM ${dbName}
      	WHERE id = $1
				LIMIT 1
      `,
			[id]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getTeacherSite = async (site = '') => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      SELECT name, bio, img, ${dbName}.id, email, location
				FROM ${dbName}
        	INNER JOIN  public."user" ON ${dbName}.id = public."user".id
        WHERE ${dbName}.site = $1
					AND ${dbName}.active like 'T'
      `,
			[site]
		)
		return res?.rows[0]
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setTeacher = async (
	id = 0,
	site = '',
	location = '',
	bio = '',
	active = '',
	img = ''
) => {
	let db = new DBConnection()

	try {
		let res

		if (img.length > 0) {
			res = await db.query(
				`
        INSERT INTO
          ${dbName} (id, site, location, bio, active, img)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
        `,
				[id, site, location, bio, active, img]
			)
		} else {
			res = await db.query(
				`
        INSERT INTO
          ${dbName} (id, site, location, bio, active)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
        `,
				[id, site, location, bio, active]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const updateTeacher = async (
	teacherId = 0,
	site = '',
	location = '',
	bio = '',
	active = '',
	img = ''
) => {
	let db = new DBConnection()

	try {
		let res

		if (img.length > 0) {
			res = await db.query(
				`
        UPDATE ${dbName}
          SET site = $2, location = $3, bio = $4, active = $5, img = $6
          WHERE id = $1
          RETURNING id
        `,
				[teacherId, site, location, bio, active, img]
			)
		} else {
			res = await db.query(
				`
        UPDATE ${dbName}
          SET site = $2, location = $3, bio = $4, active = $5
          WHERE id = $1
          RETURNING id
        `,
				[teacherId, site, location, bio, active]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
