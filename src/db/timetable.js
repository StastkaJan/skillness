import { DBConnection } from './dbConnect'

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
	let db = new DBConnection()

	let teachingArray = teaching.map(object => object.start)

	try {
		const res = await db.query(
			`
      	INSERT INTO
        	${dbName} (teacher, start)
        	VALUES ${insertMultipleRows(teacher, teachingArray)}
        	RETURNING id
      	`,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteTimetable = async (teaching = []) => {
	let db = new DBConnection()
	let idArray = teaching.map(object => object.id)

	try {
		let res = await db.query(
			`
			DELETE FROM ${dbName}
	      WHERE id IN ${removeMultipleRows(idArray)}
	    `,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

function insertMultipleRows(teacher, array) {
	let insertString = array.map(d => '(' + (Number(teacher) || 0) + ",'" + d + "')").join(',')
	return insertString
}

function removeMultipleRows(array) {
	let deleteString = '(' + array.map(d => Number(d) || 0).join(',') + ')'
	return deleteString
}
