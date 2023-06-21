import { DBConnection } from './dbConnect'

let dbName = 'review'

export const getTeacherReviews = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT score, description, "user".name as name
        FROM ${dbName}
          JOIN lesson ON lesson.id = ${dbName}.lesson
					JOIN "user" ON "user".id = lesson.user
          JOIN timetable ON timetable.id = lesson.timetable
        WHERE timetable.teacher = $1
    `,
			[teacherId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setReview = async (lesson = 0, score = 0, description = '') => {
	let db = new DBConnection()

	try {
		let res

		if (description.length > 0) {
			res = await db.query(
				`
      	INSERT INTO
        	${dbName} (lesson, score, description)
        	VALUES ($1, $2, $3)
        	RETURNING id
    		`,
				[lesson, score, description]
			)
		} else {
			res = await db.query(
				`
      	INSERT INTO
      	  ${dbName} (lesson, score)
      	  VALUES ($1, $2)
      	  RETURNING id
    		`,
				[lesson, score]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
