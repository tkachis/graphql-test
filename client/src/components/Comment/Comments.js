import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import format from 'date-fns/format'

const Comments = ({ comments, classes: { root, inline } }) => (
	<List className={root}>
		{comments.map((comment, i) => (
			<ListItem key={i} alignItems="flex-start">
				<ListItemAvatar>
					<Avatar src={comment.author.picture} alt={comment.author.name} />
				</ListItemAvatar>
				<ListItemText
					primary={comment.text}
					secondary={
						<>
							<Typography
								className={inline}
								component="span"
								color="textPrimary"
							>
								{comment.author.name}
							</Typography>{' '}
							{format(Number(comment.createdAt), 'HH:mm DD.MM.YY')}
						</>
					}
				/>
			</ListItem>
		))}
	</List>
)

const styles = theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
})

export default withStyles(styles)(Comments)
