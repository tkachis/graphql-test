const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./schemes')
const resolvers = require('./resolvers')
const { findOrCreateUser } = require('./controllers/userController')

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		let authToken = null
		let currentUser = null

		try {
			authToken = req.headers.authorization

			if (authToken) {
				currentUser = await findOrCreateUser(authToken)
			}
		} catch (err) {
			console.error(`Unable to authenticate user with token ${authToken}`)
		}

		return { currentUser }
	},
})

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.error(err))

server.listen(PORT).then(({ url }) => {
	console.log(`Server listening on ${url}`)
})
