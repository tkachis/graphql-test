import React, { useState, useContext } from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined'
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/SaveTwoTone'

import { useClient } from '../../client'
import Context from '../../context'
import { DELETE_DRAFT } from '../../constants'
import { CREATE_PIN_MUTATION } from '../../graphql/mutations'

const CreatePin = ({
	classes: {
		form,
		textField,
		input,
		headline,
		iconLarge,
		leftIcon,
		rightIcon,
		button,
	},
}) => {
	const mobileSize = useMediaQuery('(max-width: 650px)')

	const { state, dispatch } = useContext(Context)
	const { latitude, longitude } = state.draft
	const client = useClient()
	const [content, setContent] = useState({
		title: '',
		image: '',
		text: '',
	})

	const [submitting, setSubmitting] = useState(false)

	const { title, image, text } = content

	const hanldeOnChange = ({ target: { name, value, files } }) =>
		setContent({ ...content, [name]: files ? files[0] : value })

	const handleImageUpload = async () => {
		const data = new FormData()
		data.append('file', image)
		data.append('upload_preset', 'geopins')
		data.append('cloud_name', 'tkachis')
		const res = await axios.post(
			'https://api.cloudinary.com/v1_1/tkachis/image/upload',
			data
		)

		return res.data.url
	}

	const handleSubmit = async e => {
		try {
			e.preventDefault()
			setSubmitting(true)
			const url = await handleImageUpload()
			await client.request(CREATE_PIN_MUTATION, {
				title,
				image: url,
				content: text,
				latitude,
				longitude,
			})

			handleDeleteDraft()
		} catch (err) {
			setSubmitting(false)
			console.error('Error create pin', err)
		}
	}

	const handleDeleteDraft = () => {
		setContent({
			...content,
			title: '',
			image: '',
			text: '',
		})
		dispatch({ type: DELETE_DRAFT })
	}

	return (
		<form className={form}>
			<Typography
				className={headline}
				component="h2"
				variant="h4"
				color="primary"
			>
				<LandscapeIcon className={iconLarge} /> Pin Location
			</Typography>
			<div>
				<TextField
					name="title"
					lable="title"
					placeholder="Insert pin title"
					onChange={e => hanldeOnChange(e)}
				/>
				<input
					accept="image/*"
					id="image"
					type="file"
					name="image"
					className={input}
					onChange={e => hanldeOnChange(e)}
				/>
				<label htmlFor="image">
					<Button
						component="span"
						size="small"
						color={image ? 'primary' : 'default'}
					>
						<AddAPhotoIcon />
					</Button>
				</label>
			</div>
			<div className={textField}>
				<TextField
					name="text"
					label="Text"
					multiline
					rows={mobileSize ? '3' : '6'}
					margin="normal"
					fullWidth
					variant="outlined"
					onChange={e => hanldeOnChange(e)}
				/>
			</div>
			<div>
				<Button
					onClick={handleDeleteDraft}
					className={button}
					variant="contained"
					color="primary"
				>
					<ClearIcon className={leftIcon} />
					Discard
				</Button>
				<Button
					type="submit"
					className={button}
					variant="contained"
					color="primary"
					disabled={!title.trim() || !text.trim() || !image || submitting}
					onClick={handleSubmit}
				>
					Submit
					<SaveIcon className={rightIcon} />
				</Button>
			</div>
		</form>
	)
}

const styles = theme => ({
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		paddingBottom: theme.spacing.unit,
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%',
	},
	input: {
		display: 'none',
	},
	headline: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: theme.spacing.unit,
	},
	iconLarge: {
		fontSize: 40,
		marginRight: theme.spacing.unit,
	},
	leftIcon: {
		fontSize: 20,
		marginRight: theme.spacing.unit,
	},
	rightIcon: {
		fontSize: 20,
		marginLeft: theme.spacing.unit,
	},
	button: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		marginLeft: theme.spacing.unit,
	},
})

export default withStyles(styles)(CreatePin)
