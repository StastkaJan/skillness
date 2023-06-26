import { DBConnection } from './dbConnect'

let dbName = 'uni'

export const getUnis = async (search = '', offset = 0, limit = 20) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, name, shortname, logo, COUNT(id) as rows
        FROM ${dbName}
					WHERE LOWER(name) LIKE LOWER($1)
						OR LOWER(shortname) LIKE LOWER($1)
				GROUP BY id, name, shortname, logo
				ORDER BY name
				LIMIT $3
				OFFSET $2
      `,
			[`%${search}%`, offset, limit]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getAllUnis = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, name, shortname
        FROM ${dbName}
      `,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getUni = async (id = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, name, shortname, logo
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

export const setUni = async (name = '', shortname = '', logo = '') => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      INSERT INTO
        ${dbName} (name, shortname, logo)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
			[name, shortname, logo]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const updateUni = async (uniId = 0, name = '', shortname = '', logo = '') => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      UPDATE ${dbName}
        SET name = $2, shortname = $3, logo = $4
        WHERE id = $1
        RETURNING id
      `,
			[uniId, name, shortname, logo]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteUni = async (uniId = 0) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      DELETE FROM ${dbName}
        WHERE id = $1
      `,
			[uniId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
