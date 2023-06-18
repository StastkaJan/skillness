import { DBConnection } from './dbConnect'

export const getUsers = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, email, name, active
        FROM public."user"
				ORDER BY id
      `,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getUserEmail = async (email = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, email, name, password
        FROM public."user"
        WHERE email = $1 AND (active = 'T' OR active = 'W')
        LIMIT 1
      `,
			[email]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getUserId = async (userId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, email, name, password
        FROM public."user"
        WHERE id = $1 AND (active = 'T' OR active = 'W')
        LIMIT 1
      `,
			[userId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const getAllUserId = async (userId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, email, name, password
        FROM public."user"
        WHERE id = $1
        LIMIT 1
      `,
			[userId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setUser = async (email = '', name = '', password = '', active = 'W') => {
	let db = new DBConnection()

	try {
		let res = await db.query(
			`
      INSERT INTO
				public."user" (email, name, password, active)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `,
			[email, name, password, active]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const updateUser = async (id = '', email = '', name = '', password = '', active = 'W') => {
	let db = new DBConnection()

	try {
		let res
		if (password.length < 1) {
			res = await db.query(
				`
      	UPDATE public."user"
      	  SET email = $2, name = $3, active = $4
      	  WHERE id = $1
      	  RETURNING id
      	`,
				[id, email, name, active]
			)
		} else {
			res = await db.query(
				`
      	UPDATE public."user"
      	  SET email = $2, name = $3, password = $4, active = $5
      	  WHERE id = $1
      	  RETURNING id
      	`,
				[id, email, name, password, active]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
