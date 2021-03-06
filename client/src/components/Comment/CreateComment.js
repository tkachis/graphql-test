import React, { useContext, useState } from 'react'
import { withStyles } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SendIcon from '@material-ui/icons/Send'
import Divider from '@material-ui/core/Divider'

import { useClient } from '../../client'
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations'
import Context from '../../context'

const CreateComment = ({
	classes: { form, input, clearButton, sendButton },
}) => {
	const client = useClient()
	const {
		state: { currentPin },
	} = useContext(Context)
	const [comment, setComment] = useState('')

	const handleSubmitComment = async () => {
		await client.request(CREATE_COMMENT_MUTATION, {
			pinId: currentPin._id,
			text: comment,
		})

		setComment('')
	}

	return (
		<>
			<form className={form}>
				<IconButton
					onClick={() => setComment('')}
					disabled={!comment.trim()}
					className={clearButton}
				>
					<ClearIcon />
				</IconButton>
				<InputBase
					className={input}
					multiline={true}
					placeholder="Add Comment"
					value={comment}
					onChange={e => setComment(e.target.value)}
				/>
				<IconButton onClick={handleSubmitComment} className={sendButton}>
					<SendIcon />
				</IconButton>
			</form>
			<Divider />
		</>
	)
}

const styles = theme => ({
	form: {
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		marginLeft: 8,
		flex: 1,
	},
	clearButton: {
		padding: 0,
		color: 'red',
	},
	sendButton: {
		padding: 0,
		color: theme.palette.primary.dark,
	},
})

export default withStyles(styles)(CreateComment)
