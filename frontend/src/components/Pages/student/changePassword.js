import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'

import FormPasswordReset from '../helper/formPasswordReset'

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

function App() {
  return (
    <div className="App">
      <Typography variant="title" style={{ margin: '16px 0' }}>
        Reset Password 
      </Typography>
      <FormPasswordReset />
    </div>
  )
}

export default function changePassword(){
  return (<MuiThemeProvider theme={theme}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </MuiThemeProvider>);
}