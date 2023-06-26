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
      SELECT ${dbName}.id as id, ${dbName}.name as name, description, ident, faculty.name as faculty, faculty.id as facultyid, faculty.uni as uni
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

export const getAllSubjectsOpt = async (
	faculty = 0,
	uni = 0,
	search = '',
	offset = 0,
	limit = 20
) => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
				SELECT ${dbName}.id as id, faculty, ${dbName}.name as name, description, ident, COUNT(${dbName}.id) as rows, faculty.name as facultyname, uni.id as uni
					FROM ${dbName}
						JOIN faculty ON faculty.id = ${dbName}.faculty
						JOIN uni ON faculty.uni = uni.id
					WHERE (LOWER(${dbName}.name) LIKE LOWER($1)
						OR LOWER(ident) LIKE LOWER($1)
						OR LOWER(description) LIKE LOWER($1))
						${faculty ? 'AND faculty IN ($4)' : uni ? 'AND faculty.uni IN ($4)' : ''}
					GROUP BY ${dbName}.id, faculty, ${dbName}.name, description, ident, faculty.name, uni.id
					ORDER BY ${dbName}.name
					LIMIT $3
					OFFSET $2
				`,
			faculty
				? [`%${search}%`, offset, limit, faculty]
				: uni
				? [`%${search}%`, offset, limit, uni]
				: [`%${search}%`, offset, limit]
		)
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
