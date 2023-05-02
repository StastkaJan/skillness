import pg from 'pg'
if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}

const { Client } = pg

export class DBConnection {
	sql

	constructor() {
		this.sql = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false
			}
		})
	}

	async query(sql = '', data = ['']) {
		await this.sql.connect()

		try {
			const res = await this.sql.query(sql, data)
			return res
		} catch (err) {
			console.log(err)
			throw err
		} finally {
			this.sql.end()
		}
	}
}
