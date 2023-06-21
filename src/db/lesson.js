import { DBConnection } from './dbConnect'
import { autoUpdatePayment } from '$db/payment'
import { getLastLessonsUpdated, setLastLessonsUpdated } from '$store/serverStore'

let dbName = 'lesson'

export const getLesson = async (id = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT lesson.id as id, timetable.teacher as teacher, "user".email as userEmail, "user".id as user, timetable.start as start, status
        FROM ${dbName}
					JOIN timetable ON timetable.id = ${dbName}.timetable
					JOIN "user" ON "user".id = lesson."user"
        WHERE lesson.id = $1
    	`,
			[id]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getUserLessons = async (userId = 0) => {
	autoUpdateLesson()
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT lesson.id as id, timetable.start as start, "user".name as teacher, subject.name as subject, status, site
        FROM ${dbName}
          LEFT JOIN timetable ON timetable.id = ${dbName}.timetable
          LEFT JOIN teacher ON teacher.id = timetable.teacher
          LEFT JOIN "user" ON "user".id = timetable.teacher
          LEFT JOIN teaching ON teaching.id = ${dbName}.teaching
					LEFT JOIN subject ON teaching.subject = subject.id
        WHERE lesson."user" = $1
				ORDER BY timetable.start
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
	autoUpdateLesson()
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT lesson.id as id, timetable.start as start, "user".name as student, subject.name as subject, status
        FROM ${dbName}
          LEFT JOIN "user" ON "user".id = ${dbName}."user"
          LEFT JOIN timetable ON timetable.id = ${dbName}.timetable
          LEFT JOIN teacher ON teacher.id = timetable.teacher
          LEFT JOIN teaching ON teaching.id = ${dbName}.teaching
					LEFT JOIN subject ON teaching.subject = subject.id
        WHERE teacher.id = $1
					AND timetable.start > now()
					AND status in ('W', 'T')
				ORDER BY timetable.start
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

export const deleteLesson = async (lessonId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      DELETE FROM ${dbName}
        WHERE id = $1
    	`,
			[lessonId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const autoUpdateLesson = async () => {
	let date = new Date()
	if (getLastLessonsUpdated() > new Date()) {
		setLastLessonsUpdated(new Date(date.setTime(date.getTime() + 3.6e6)))
	}
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      UPDATE ${dbName}
        SET status = 'F'
        WHERE timetable IN (
					SELECT id
						FROM timetable
						WHERE start > now()
				)
					AND status like 'W'
				RETURNING id
    	`,
			[]
		)
		autoUpdatePayment()
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
