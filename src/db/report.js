import { DBConnection } from './dbConnect'

let dbName = 'report'

export const getAllReports = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, email, text, topic
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

export const getReport = async (reportId = 0) => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT id, email, text, topic
        FROM ${dbName}
        WHERE id = $1
      `,
			[reportId]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}

export const setReport = async (email = '', text = '', topic = '') => {
	let db = new DBConnection()

	try {
		let res

		if (topic.length > 0) {
			res = await db.query(
				`
        INSERT INTO
          ${dbName} (email, text, topic)
          VALUES ($1, $2, $3)
          RETURNING id
        `,
				[email, text, topic]
			)
		} else {
			res = await db.query(
				`
        INSERT INTO
          ${dbName} (email, text)
          VALUES ($1, $2)
          RETURNING id
        `,
				[email, text]
			)
		}
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
