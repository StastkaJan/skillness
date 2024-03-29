import { DBConnection } from './dbConnect'

let dbName = 'faculty'

export const getFaculties = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT ${dbName}.name, ${dbName}.shortname, ${dbName}.id, uni.name as uni, ${dbName}.uni as uniid
        FROM ${dbName}
					JOIN uni ON uni.id = ${dbName}.uni
      `,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getFaculty = async (id = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT ${dbName}.name, ${dbName}.shortname, ${dbName}.id, uni.name
        FROM ${dbName}
					JOIN uni ON uni.id = ${dbName}.uni
				WHERE ${dbName}.id = $1
      `,
			[id]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getUniFaculties = async (uniId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT name, shortname, id
        FROM ${dbName}
        WHERE uni = $1
      `,
			[uniId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getUniFacultiesNames = async (uniId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT name, id
        FROM ${dbName}
        WHERE uni = $1
      `,
			[uniId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setFaculty = async (uniId = 0, name = '', shortname = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      INSERT INTO
        ${dbName} (uni, name, shortname)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
			[uniId, name, shortname]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const updateFaculty = async (facultyId = 0, uniId = 0, name = '', shortname = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      UPDATE ${dbName}
        SET uni = $2, name = $3, shortname = $4
        WHERE id = $1
				RETURNING id
      `,
			[facultyId, uniId, name, shortname]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteFaculty = async (facultyId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      DELETE FROM ${dbName}
        WHERE id = $1
      `,
			[facultyId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
