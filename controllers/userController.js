const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

const verifyAuthToken = async token => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.OAUTH_CLIENT_ID,
		})

		return ticket.getPayload()
	} catch (err) {
		console.error('Error verifying auth token', err)
	}
}

const checkIfUserExist = async email => await User.findOne({ email }).exec()

const createNewUser = ({ name, email, picture }) => {
	const newUser = { name, email, picture }
	return new User(newUser).save()
}

exports.findOrCreateUser = async token => {
	// верифицировать токен
	const googleUser = await verifyAuthToken(token)
	// проверить есть ли такой пользователь
	const user = await checkIfUserExist(googleUser.email)
	// если пользователь есть --> вернуть его, если нет --> создать нового
	return user ? user : createNewUser(googleUser)
}
