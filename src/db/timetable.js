import { DBConnection, DBConnectionPool } from './dbConnect'

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

export const setTimetable = async (teacher = 0, teaching = []) => {
	let db = new DBConnectionPool()

	try {
		teaching.forEach(async ({ start }) => {
			let res = await db.query(
				`
      	INSERT INTO
        	${dbName} (teacher,start)
        	VALUES ($1, $2)
        	RETURNING id
      	`,
				[teacher, start]
			)
		})
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteTimetable = async (teacher = 0, teaching = []) => {
	let db = new DBConnectionPool()

	try {
		teaching.forEach(async ({ id }) => {
			let res = await db.query(
				`
			DELETE FROM ${dbName}
        WHERE teacher = $1
					AND id = $2
      `,
				[teacher, id]
			)
		})
	} catch (err) {
		console.log(err)
		throw err
	}
}
