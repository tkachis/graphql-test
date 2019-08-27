const { ApolloServer } = require('apollo-server')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
	typeDefs,
	resolvers,
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
