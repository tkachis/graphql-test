import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import format from 'date-fns/format'

import CreateComment from '../Comment/CreateComment'
import Comments from '../Comment/Comments'

import Context from '../../context'

const PinContent = ({ classes: { root, icon, text, picture } }) => {
	const { state } = useContext(Context)
	const { title, content, author, createdAt, comments } = state.currentPin

	return (
		<div className={root}>
			<Typography className={text} component="h3" variant="h6">
				<img src={author.picture} alt={author.name} className={picture} />
				{author.name}
			</Typography>
			<Typography component="h2" variant="h4" color="primary" className={text}>
				{title}
			</Typography>
			<Typography variant="subtitle1" className={text}>
				{content}
			</Typography>
			<Typography className={text} variant="subtitle2">
				<AccessTimeIcon className={icon} />
				{format(Number(createdAt), 'MMM Do, YYYY')}
			</Typography>

			{/* Pin Comments */}
			<CreateComment />
			<Comments comments={comments} />
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
	},
	text: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: theme.spacing.unit * 2,
	},
	picture: {
		width: '50px',
		marginRight: theme.spacing.unit,
		borderRadius: '50%',
	},
})

export default withStyles(styles)(PinContent)
