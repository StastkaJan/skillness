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

export const insertWithdraw = async (user = 0, sum = 0, account = '') => {
	let db = new DBConnection()

	try {
		const res = await db.query(
			`
			INSERT INTO
				${dbName} ("user", sum, account)
				VALUES ($1, $2, $3)
				RETURNING id
      `,
			[user, sum, account]
		)
		return res?.rows
	} catch (err) {
		console.log(err)
		throw err
	}
}
