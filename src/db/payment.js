import { DBConnection } from './dbConnect'
import { getLastPaymentsUpdated, setLastPaymentsUpdated } from '$store/serverStore'

let dbName = 'payment'

export const getUserPayment = async (userId = 0) => {
	autoUpdatePayment()
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, timestamp, paid, sum, lesson, payment
        FROM ${dbName}
        WHERE "user" = $1
					AND "timestamp" < now()
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
					AND "timestamp" < now()
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
        ${dbName} ("user", timestamp, paid, sum ${id ? ', payment' : ''})
        VALUES ($1, $2, $3, $4 ${id ? ', $5' : ''})
        RETURNING id
      `,
			id ? [userId, timestamp, paid, sum, id] : [userId, timestamp, paid, sum]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const setPaymentLesson = async (
	lesson = '',
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
        ${dbName} ("user", timestamp, paid, sum, lesson)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `,
			[userId, timestamp, paid, sum, lesson]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const setPaymentWithdraw = async (
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
        ${dbName} ("user", timestamp, paid, sum)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `,
			[userId, timestamp, paid, sum]
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

export const updatePaymentLesson = async (lessonId = '', paid = 'W') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      UPDATE ${dbName}
        SET paid = $2
        WHERE lesson = $1
				RETURNING id
      `,
			[lessonId, paid]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
	}
}

export const deletePayment = async (id = '') => {
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
	}
}

export const autoUpdatePayment = async () => {
	if (getLastPaymentsUpdated() < new Date()) {
		let date = new Date()
		setLastPaymentsUpdated(new Date(date.setTime(date.getTime() + 3.6e6)))
		return
	}
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      UPDATE ${dbName}
        SET paid = 'F'
        WHERE lesson IN (
					SELECT lesson.id
						FROM lesson
							JOIN timetable ON lesson.timetable = timetable.id
						WHERE status IN ('W', 'F')
							AND start < now()
				)
					AND paid like 'T'
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
