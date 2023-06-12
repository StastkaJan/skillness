import pg from 'pg'
if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}

const { Client, Pool } = pg

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
			await this.sql.end()
		}
	}
}

export class DBConnectionPool {
	sql

	constructor() {
		this.sql = new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false
			},
			max: 2
		})
	}

	async query(sql = '', data = ['']) {
		try {
			const res = await this.sql.query(sql, data)
			return res
		} catch (err) {
			console.log(err)
			throw err
		}
	}
}
