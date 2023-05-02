import nodemailer from 'nodemailer'
if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.gmailname,
		pass: process.env.gmailpass
	}
})

export const sendMail = (receiver, subject, content) => {
	const mailOptions = {
		from: process.env.gmailname,
		to: receiver,
		subject: subject,
		html: content
	}

	return new Promise(resolve => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error)
				resolve({ success: false, error })
			} else {
				resolve({ success: true, info })
			}
		})
	})
}
