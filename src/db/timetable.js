import { DBConnection } from './dbConnect'

let dbName = 'timetable'

export const getTimetable = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT day, start, end, repeating
        FROM ${dbName}
        WHERE teacher = $1 AND active = 'T'
      `,
			[teacherId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setTimetable = async (
	teacher = 0,
	day = new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
	start = new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
	end = new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
	repeating = 'T'
) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      INSERT INTO
        ${dbName} (teacher, day, start, end, repeating)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `,
			[teacher, day, start, end, repeating]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deactivateTimetable = async (timetableId = 0, active = 'F') => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      UPDATE ${dbName}
        SET active = $2
        WHERE id = $1
        RETURNING id
      `,
			[timetableId, active]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
