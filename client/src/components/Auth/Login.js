import React, { useContext } from 'react'
import { GraphQLClient } from 'graphql-request'
import { GoogleLogin } from 'react-google-login'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Context from '../../context'
import { LOGIN_USER, IS_LOGGED_IN } from '../../constants'
import { ME_QUERY } from '../../graphql/queries'
import { BASE_URL } from '../../client'

const Login = ({ classes }) => {
	const { dispatch } = useContext(Context)

	const onSuccess = async googleUser => {
		try {
			const idToken = googleUser.getAuthResponse().id_token
			const client = new GraphQLClient(BASE_URL, {
				headers: { authorization: idToken },
			})
			const { me } = await client.request(ME_QUERY)
			dispatch({ type: LOGIN_USER, payload: me })
			dispatch({ type: IS_LOGGED_IN, payload: googleUser.isSignedIn() })
		} catch (err) {
			onFailure(err)
		}
	}

	const onFailure = err => {
		console.error('Error logging in', err)
		dispatch({ type: IS_LOGGED_IN, payload: false })
	}

	return (
		<div className={classes.root}>
			<Typography
				component="h1"
				variant="h3"
				gutterBottom
				noWrap
				style={{ color: 'rgb(66, 133, 244)' }}
			>
				Welcome
			</Typography>
			<GoogleLogin
				clientId="953815518824-95unf8hivth4a39aftafk3pj4tog204h.apps.googleusercontent.com"
				onSuccess={onSuccess}
				onFailure={onFailure}
				isSignedIn={true}
				buttonText="Login with Google"
				theme="dark"
			/>
		</div>
	)
}

const styles = {
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
}

export default withStyles(styles)(Login)
