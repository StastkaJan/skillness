import { DBConnection } from './dbConnect'

let dbName = 'payment'

export const getUserPayment = async (userId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, timestamp, paid, sum, lesson, payment
        FROM ${dbName}
        WHERE "user" = $1
				ORDER BY timestamp DESC
      `,
			[userId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const getIdPayment = async (id = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT payment
        FROM ${dbName}
        WHERE id = $1
      `,
			[id]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const getUUIDPayment = async (id = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT payment
        FROM ${dbName}
        WHERE payment = $1
      `,
			[id]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const getBalance = async (userId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT SUM(sum) as sum
        FROM ${dbName}
        WHERE "user" = $1
					AND paid = 'T'
      `,
			[userId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const setPayment = async (
	id = '',
	userId = 0,
	timestamp = new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
	paid = 'W',
	sum = 0
) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      INSERT INTO
        ${dbName} (payment, "user", timestamp, paid, sum)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `,
			[id, userId, timestamp, paid, sum]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const updatePayment = async (id = '', paid = 'W') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      UPDATE ${dbName}
        SET paid = $2
        WHERE payment like $1
				RETURNING id
      `,
			[id, paid]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}