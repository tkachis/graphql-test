import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'
import indigo from '@material-ui/core/colors/indigo'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: amber[300],
			main: amber[500],
			dark: amber[700],
		},
		secondary: {
			light: indigo[300],
			main: indigo[500],
			dark: indigo[700],
		},
	},
	typography: {
		useNextVariants: true,
	},
})

function withRoot(Component) {
	function WithRoot(props) {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...props} />
			</MuiThemeProvider>
		)
	}

	return WithRoot
}

export default withRoot
