import { DBConnection } from './dbConnect'

let dbName = 'teaching'

export const getTeaching = async (teachingId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT teacher
        FROM ${dbName}
        WHERE id = $1
      `,
			[teachingId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getTeachings = async (teacherId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT subject.name, price, ident, faculty.shortname as faculty, uni.shortname as uni, teaching.id, subject.id as subjectId
        FROM ${dbName}
          INNER JOIN subject ON subject.id = ${dbName}.subject
					INNER JOIN faculty ON subject.faculty = faculty.id
					INNER JOIN uni ON faculty.uni = uni.id
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

export const getTeachingSubject = async (teacher = 0, subject = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT *
        FROM ${dbName}
        WHERE teacher = $1
					AND subject = $2
      `,
			[teacher, subject]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setTeaching = async (subject = 0, teacher = 0, price = 0) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      INSERT INTO
        ${dbName} (subject, teacher, price)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
			[subject, teacher, price]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const updateTeaching = async (id = 0, subject = 0, teacher = 0, price = 0) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      UPDATE ${dbName}
				SET subject = $2, teacher = $3, price = $4
				WHERE id = $1
        RETURNING id
      `,
			[id, subject, teacher, price]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteTeaching = async (teachingId = 0) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      DELETE FROM ${dbName}
        WHERE id = $1
      `,
			[teachingId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
