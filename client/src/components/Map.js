import React, { useState, useEffect, useContext } from 'react'
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl'
import { withStyles } from '@material-ui/core/styles'
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from './Pin/PinIcon'
import Blog from './Blog'

import { useClient } from '../client'
import { GET_PINS_QUERY } from '../graphql/queries'

import Context from '../context'
import { CREATE_DRAFT, UPDATE_DRAFT_LOCATION, GET_PINS } from '../constants'

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
	const [userPosition, setUserPosition] = useState(null)

	const {
		state: { draft, pins },
		dispatch,
	} = useContext(Context)

	const client = useClient()

	useEffect(() => {
		getUserPosition()
		getPins()
	}, [])

	const getPins = async () => {
		const { getPins } = await client.request(GET_PINS_QUERY)
		dispatch({ type: GET_PINS, payload: getPins })
	}

	const getUserPosition = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				const { latitude, longitude } = position.coords
				setViewport({ ...viewport, latitude, longitude })
				setUserPosition({ latitude, longitude })
			})
		}
	}

	const handleMapClick = ({ lngLat, leftButton }) => {
		if (!leftButton) return
		if (!draft) {
			dispatch({ type: CREATE_DRAFT })
		}
		const [longitude, latitude] = lngLat
		dispatch({
			type: UPDATE_DRAFT_LOCATION,
			payload: { longitude, latitude },
		})
	}

	return (
		<div className={root}>
			<ReactMapGL
				width="100vw"
				height="calc(100vh - 64px)"
				mapStyle="mapbox://styles/mapbox/dark-v9"
				mapboxApiAccessToken="pk.eyJ1IjoidGthY2hpcyIsImEiOiJjanp1ODNhbmUwN3ZpM21sMjk0cm1hZmszIn0.c7IbXwBZGCrhXas_UMmWXg"
				onViewportChange={newViewport => setViewport(newViewport)}
				onClick={handleMapClick}
				{...viewport}
			>
				{/* Navigation Control */}
				<div className={navigationControl}>
					<NavigationControl />
				</div>

				{/* Pin for User's Current Position */}
				{userPosition && (
					<Marker
						latitude={userPosition.latitude}
						longitude={userPosition.longitude}
						offsetLeft={-19}
						offsetTop={-37}
					>
						<PinIcon size={40} color="primary" />
					</Marker>
				)}

				{/* Draft Pin */}
				{draft && (
					<Marker
						latitude={draft.latitude}
						longitude={draft.longitude}
						offsetLeft={-19}
						offsetTop={-37}
					>
						<PinIcon size={40} color="secondary" />
					</Marker>
				)}

				{/* Created Pins */}
				{pins.length > 0 &&
					pins.map(pin => (
						<Marker
							key={pin._id}
							latitude={pin.latitude}
							longitude={pin.longitude}
							offsetLeft={-19}
							offsetTop={-37}
						>
							<PinIcon size={40} color="secondary" />
						</Marker>
					))}
			</ReactMapGL>

			{/* Blog Area to add Pin Content */}
			<Blog />
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
