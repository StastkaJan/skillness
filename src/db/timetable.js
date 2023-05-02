import { DBConnection, DBConnectionPool } from './dbConnect'

let dbName = 'timetable'

export const getTimetable = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT start
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

export const setTimetable = async (teacher = 0, teaching = []) => {
	let db = new DBConnectionPool()

	try {
		let res
		teaching.forEach(async ({ start }) => {
			res = await db.query(
				`
      	INSERT INTO
        	${dbName} (teacher,start)
        	VALUES ($1, $2)
        	RETURNING id
      	`,
				[teacher, start]
			)
		})
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteTimetable = async (teacher = 0) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
			DELETE FROM ${dbName}
        WHERE teacher = $1
      `,
			[teacher]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
