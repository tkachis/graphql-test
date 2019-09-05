import React, { useContext } from 'react'
import { GoogleLogout } from 'react-google-login'

import { withStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'

import { SIGNOUT_USER } from '../../constants'
import Context from '../../context'

const Signout = ({ classes: { root, buttonIcon, buttonText } }) => {
	const mobileSize = useMediaQuery('(max-width: 650px)')

	const { dispatch } = useContext(Context)

	const onSignout = () => {
		dispatch({ type: SIGNOUT_USER })
		console.log('Signed out user')
	}

	return (
		<GoogleLogout
			onLogoutSuccess={onSignout}
			buttonText="Sigout"
			render={({ onClick }) => (
				<span className={root} onClick={onClick}>
					<Typography
						style={{ display: mobileSize ? 'none' : 'block' }}
						variant="body1"
						className={buttonText}
					>
						Signout
					</Typography>
					<ExitToAppIcon className={buttonIcon} />
				</span>
			)}
		/>
	)
}

const styles = {
	root: {
		cursor: 'pointer',
		display: 'flex',
	},
	buttonText: {
		color: '#fff',
	},
	buttonIcon: {
		marginLeft: '5px',
		color: '#fff',
	},
}

export default withStyles(styles)(Signout)
