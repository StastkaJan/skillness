// let sessions = []

// export const createSession = (id = '', email = '') => {
// 	let activeSession = sessions.find(session => session.id == id)

// 	if (activeSession) return activeSession

// 	let session = {
// 		id,
// 		email
// 	}
// 	sessions.push(session)

// 	return session
// }

// export const getSession = (sessionId = '') => {
// 	let session = sessions.find(session => session.id === sessionId)
// 	return session
// }

// export const removeSession = (sessionId = '') => {
// 	let session = sessions.find(session => session.id === sessionId)
// 	if (!session) return new Error('Session not found')
// 	sessions = sessions.filter(session => session.id !== sessionId)
// 	return 'success'
// }

export let lastLessonsUpdated = new Date(0)

export let lastPaymentsUpdated = new Date(0)
