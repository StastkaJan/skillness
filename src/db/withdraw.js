import { DBConnection } from './dbConnect'

let dbName = 'withdraw'

export const getAll = async () => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
      SELECT ${dbName}.id as id, public."user".email as user, sum, account
        FROM ${dbName}
        JOIN public."user" ON public."user".id = ${dbName}."user"
      `,
			[]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
