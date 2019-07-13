import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import AnaliticsImg from './../../img/analytics.jpg'

import SignIn from './SignIn'
import SignUp from './SignUp'
/**
 * TODO:
 * - Validate input
 * - try/catch loginIn
 * - handle error
 * - if successful save token to local storage
 * - set context isSignedIn: true
 * - go to dashboard
 * - handle remember me, forgot password y signUp
 * - check if variables could be pass directly into signin function
 * - change built with love
 */

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${AnaliticsImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}))

export default function Account(props) {
  const { setSignedIn, request } = props
  const [page, setPage] = useState('signIn')

  const classes = useStyles()

  function handleContent() {
    // console.log(request.type)
    console.log('... in handle content: Account', page)
    if (request) {
      if (request.type === 'confirmation') return <h1>Confirmation</h1>
      else if (request.type === 'reset') return <h1>Reset Password</h1>
    } else {
      if (page === 'signIn')
        return <SignIn setSignedIn={setSignedIn} setPage={setPage} />
      else if (page === 'signUp')
        return <SignUp setSignedIn={setSignedIn} setPage={setPage} />
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {handleContent()}
      </Grid>
    </Grid>
  )
}
