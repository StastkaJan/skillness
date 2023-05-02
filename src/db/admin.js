import { DBConnection } from './dbConnect'

let dbName = 'admin'

export const getAdmin = async (name = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT name, password
        FROM ${dbName}
        WHERE name = $1
      `,
			[name]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
