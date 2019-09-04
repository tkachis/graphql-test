import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import format from 'date-fns/format'

import Context from '../../context'

const PinContent = ({ classes: { root, icon, text, picture } }) => {
	const { state } = useContext(Context)
	const { title, content, author, createdAt, comments } = state.currentPin

	return (
		<div className={root}>
			<Typography component="h2" variant="h4" color="primary" gutterButtom>
				{title}
			</Typography>
			<Typography className={text} component="h3" variant="h6" gutterButtom>
				<img src={author.picture} alt="user-avatar" className={picture} />
				{author.name}
			</Typography>
			<Typography variant="subtitle1" className={text} gutterButtom>
				{content}
			</Typography>
			<Typography className={text} variant="subtitle2" gutterButtom>
				<AccessTimeIcon className={icon} />
				{format(Number(createdAt), 'MMM Do, YYYY')}
			</Typography>
		</div>
	)
}

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '1em 0.5em',
		textAlign: 'center',
		width: '100%',
	},
	icon: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		marginTop: theme.spacing.unit,
	},
	text: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	picture: {
		width: '50px',
		marginRight: theme.spacing.unit,
		borderRadius: '50%',
	},
})

export default withStyles(styles)(PinContent)
