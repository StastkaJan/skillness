import { DBConnection } from './dbConnect'

let dbName = 'subject'

export const getAllSubjects = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, name, description, ident
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

export const getSubjects = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT ${dbName}.id as id, ${dbName}.name as name, description, ident, faculty.name as faculty
        FROM ${dbName}
				JOIN faculty ON ${dbName}.faculty = faculty.id
      `,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getSubject = async (id = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, name, description, ident
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

export const searchSubject = async (name = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, name, description, ident
        FROM ${dbName}
				WHERE LOWER(name) like LOWER($1)
      `,
			[`%${name}%`]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getAllSubjectsOpt = async opt => {
	let db = new DBConnection()

	try {
		let res
		if (!opt.get('faculty')) {
			res = await db.query(
				`
				SELECT * 
					FROM ${dbName}
				`,
				[]
			)
		} else {
			res = await db.query(
				`
				SELECT *
					FROM ${dbName}
				WHERE faculty = $1
				`,
				[opt.get('faculty')]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setSubject = async (faculty = 0, name = '', description = '', ident = '') => {
	let db = new DBConnection()

	try {
		let res

		if (ident.length > 0) {
			res = await db.query(
				`
        INSERT INTO
          ${dbName} (faculty, name, description, ident)
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `,
				[faculty, name, description, ident]
			)
		} else {
			res = await db.query(
				`
        INSERT INTO
          ${dbName} (faculty, name, description)
          VALUES ($1, $2, $3)
          RETURNING id
        `,
				[faculty, name, description]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const updateSubject = async (
	id = 0,
	faculty = 0,
	name = '',
	description = '',
	ident = ''
) => {
	let db = new DBConnection()

	try {
		let res

		if (ident.length > 0) {
			res = await db.query(
				`
        UPDATE ${dbName}
          SET faculty = $2, name = $3, description = $4, ident = $5
          WHERE id = $1
          RETURNING id
        `,
				[id, faculty, name, description, ident]
			)
		} else {
			res = await db.query(
				`
        UPDATE ${dbName}
          SET faculty = $2, name = $3, description = $4
          WHERE id = $1
          RETURNING id
        `,
				[id, faculty, name, description]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const deleteSubject = async (id = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      DELETE FROM ${dbName}
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
