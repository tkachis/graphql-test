import React, { useContext, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './pages/App'
import Splash from './pages/Splash'
import ProtectedRoute from './ProtectedRoute'

import Context from './context'
import reducer from './reducer'

import 'mapbox-gl/dist/mapbox-gl.css'

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:5000/graphql',
	options: {
		reconnect: true,
	},
})

const client = new ApolloClient({
	link: wsLink,
	cache: new InMemoryCache(),
})

const Root = () => {
	const initialState = useContext(Context)
	const [state, dispatch] = useReducer(reducer, initialState)
	console.log({ state })

	return (
		<ApolloProvider client={client}>
			<Context.Provider value={{ state, dispatch }}>
				<Router>
					<Switch>
						<ProtectedRoute exact path="/" component={App} />
						<Route path="/login" component={Splash} />
					</Switch>
				</Router>
			</Context.Provider>
		</ApolloProvider>
	)
}

ReactDOM.render(<Root />, document.getElementById('root'))
