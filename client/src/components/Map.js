import React, { useState } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import { withStyles } from '@material-ui/core/styles'
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const Map = ({
	classes: {
		root,
		rootMobile,
		navigationControl,
		deleteIcon,
		popupImage,
		popupTab,
	},
}) => {
	const [viewport, setViewport] = useState({
		latitude: 59.9387,
		longitude: 30.3162,
		zoom: 13,
	})

	return (
		<div className={root}>
			<ReactMapGL
				width="100vw"
				height="calc(100vh - 64px)"
				mapStyle="mapbox://styles/mapbox/dark-v9"
				mapboxApiAccessToken="pk.eyJ1IjoidGthY2hpcyIsImEiOiJjanp1ODNhbmUwN3ZpM21sMjk0cm1hZmszIn0.c7IbXwBZGCrhXas_UMmWXg"
				onViewportChange={newViewport => setViewport(newViewport)}
				{...viewport}
			>
				{/* Navigation Control */}
				<div className={navigationControl}>
					<NavigationControl />
				</div>
			</ReactMapGL>
		</div>
	)
}

const styles = {
	root: {
		display: 'flex',
	},
	rootMobile: {
		display: 'flex',
		flexDirection: 'column-reverse',
	},
	navigationControl: {
		position: 'absolute',
		top: 0,
		left: 0,
		margin: '1em',
	},
	deleteIcon: {
		color: 'red',
	},
	popupImage: {
		padding: '0.4em',
		height: 200,
		width: 200,
		objectFit: 'cover',
	},
	popupTab: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
}

export default withStyles(styles)(Map)
