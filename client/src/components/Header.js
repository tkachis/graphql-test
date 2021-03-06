import React, { useContext } from 'react'

import { withStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MapIcon from '@material-ui/icons/Map'
import Typography from '@material-ui/core/Typography'

import Context from '../context'
import Signout from './Auth/Signout'

const Header = ({ classes: { root, grow, icon, img, mobile } }) => {
	const mobileSize = useMediaQuery('(max-width: 650px)')

	const {
		state: { currentUser },
	} = useContext(Context)

	const { name, picture } = currentUser

	return (
		<div className={root}>
			<AppBar position="static">
				<Toolbar>
					{/* Title / Logo */}
					<div className={grow}>
						<MapIcon className={icon} />
						<Typography
							className={mobileSize ? mobile : ''}
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
						>
							GeoPins
						</Typography>
					</div>

					{/* Current User Info */}
					{currentUser && (
						<div className={grow}>
							<img className={img} src={picture} alt={name} />
							<Typography
								className={mobileSize ? mobile : ''}
								variant="h5"
								color="inherit"
								noWrap
							>
								{name}
							</Typography>
						</div>
					)}

					{/* Signout Button */}
					<Signout />
				</Toolbar>
			</AppBar>
		</div>
	)
}

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		color: '#fff',
	},
	icon: {
		marginRight: theme.spacing.unit,
		color: '#fff',
		fontSize: 45,
	},
	mobile: {
		display: 'none',
	},
	img: {
		height: '50px',
		borderRadius: '90%',
		marginRight: theme.spacing.unit * 2,
	},
})

export default withStyles(styles)(Header)
