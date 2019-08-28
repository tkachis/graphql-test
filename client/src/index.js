import React, { useContext, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './pages/App'
import Splash from './pages/Splash'
import ProtectedRoute from './ProtectedRoute'

import Context from './context'
import reducer from './reducer'

import 'mapbox-gl/dist/mapbox-gl.css'

const Root = () => {
	const initialState = useContext(Context)
	const [state, dispatch] = useReducer(reducer, initialState)
	console.log({ state })

	return (
		<Context.Provider value={{ state, dispatch }}>
			<Router>
				<Switch>
					<ProtectedRoute exact path="/" component={App} />
					<Route path="/login" component={Splash} />
				</Switch>
			</Router>
		</Context.Provider>
	)
}

ReactDOM.render(<Root />, document.getElementById('root'))
