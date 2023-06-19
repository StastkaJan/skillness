import { DBConnection } from './dbConnect'

let dbName = 'lesson'

export const getUserLessons = async (userId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT time, "user".name, teacher.site
        FROM ${dbName}
          INNER JOIN "user" ON "user".id = ${dbName}.teacher
          INNER JOIN teacher ON teacher.id = ${dbName}.teacher
        WHERE user = $1
    	`,
			[userId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getTeacherLessons = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT time, "user".name, teacher.site
        FROM ${dbName}
          INNER JOIN "user" ON "user".id = ${dbName}.teacher
          INNER JOIN teacher ON teacher.id = ${dbName}.teacher
        WHERE teacher = $1
    	`,
			[teacherId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const insertLesson = async (
	userId = 0,
	timetableId = 0,
	teachingId = 0,
	time = new Date().toISOString().replace('T', ' ').replace(/\..+/, '')
) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      INSERT INTO
        ${dbName} ("user", timetable, teaching, time)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    	`,
			[userId, timetableId, teachingId, time]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const updateLesson = async (lessonId = 0, status = 'W') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      UPDATE ${dbName}
        SET status = $2
        WHERE id = $1
				RETURNING id
    	`,
			[lessonId, status]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
