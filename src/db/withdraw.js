import { DBConnection } from './dbConnect'

let dbName = 'withdraw'

export const getAll = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT *
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
