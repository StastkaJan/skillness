import { DBConnection } from './dbConnect'
import format from 'pg-format'

let dbName = 'timetable'

export const getTimetable = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT start, id
        FROM ${dbName}
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

export const getTimetableById = async (id = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT start, id
        FROM ${dbName}
        WHERE id = $1
      `,
			[id]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getTimetableDate = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT start, id
        FROM ${dbName}
        WHERE teacher = $1
					AND start > CURRENT_TIMESTAMP
      `,
			[teacherId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getTimetableDates = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT DISTINCT start::date
        FROM ${dbName}
        WHERE teacher = $1
					AND start > CURRENT_TIMESTAMP
					AND start < now() + '14 days'::interval
					AND id NOT IN (
						SELECT timetable 
							FROM lesson
					)
				ORDER BY start
      `,
			[teacherId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getTimetableTimes = async (teacherId = 0, date = '', dateEnd = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT start, id
        FROM ${dbName}
        WHERE teacher = $1
					AND start > $2
					AND start < $3
					AND id NOT IN (
						SELECT timetable 
							FROM lesson
					)
				ORDER BY start
      `,
			[teacherId, date, dateEnd]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setTimetable = async (teacher = 0, teaching = []) => {
	let db = new DBConnection()

	let teachingArray = []

	teaching.map(object => {
		teachingArray.push([teacher, object.start])
	})

	try {
		const query = format(
			`
      	INSERT INTO
        	${dbName} (teacher, start)
        	VALUES %L
        	RETURNING id
      	`,
			teachingArray
		)
		const res = await db.query(query, [])
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteTimetable = async (teaching = []) => {
	let db = new DBConnection()
	let idArray = [teaching.map(object => object.id)]

	try {
		const query = format(
			`
			DELETE FROM ${dbName}
	      WHERE id IN %L
					AND id NOT IN (
						SELECT timetable
							FROM lesson
					)
	    `,
			idArray
		)
		const res = await db.query(query, [])
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
