import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined'
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/SaveTwoTone'

const CreatePin = ({
	classes: {
		form,
		contentField,
		input,
		headline,
		iconLarge,
		leftIcon,
		rightIcon,
		button,
	},
}) => {
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
				<TextField name="title" lable="title" placeholder="Insert pin title" />
				<input accept="image/*" id="image" type="file" className={input} />
				<label htmlFor="image">
					<Button component="span" size="small">
						<AddAPhotoIcon />
					</Button>
				</label>
			</div>
			<div className={contentField}>
				<TextField
					name="content"
					label="Content"
					multiline
					rows="6"
					margin="normal"
					fullWidth
					variant="outlined"
				/>
			</div>
			<div>
				<Button className={button} variant="contained" color="primary">
					<ClearIcon className={leftIcon} />
					Discard
				</Button>
				<Button
					type="submit"
					className={button}
					variant="contained"
					color="primary"
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
	contentField: {
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
