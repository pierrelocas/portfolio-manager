import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import AnaliticsImg from './../../img/analytics.jpg'

import SignIn from './SignIn'
import SignUp from './SignUp'
import Confirm from './Confirm'
import Forgot from './Forgot'
import Activate from './request/Activate'
import Reset from './request/Reset'

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

// Container component to set the page
export default function Account(props) {
  const { authenticate, isSignedIn, isConfirmed } = props
  const [page, setPage] = useState('signIn')

  const [request, setRequest] = useState(null)

  // Get email confirmation and reset password from url
  useEffect(() => {
    console.log('account useeffect')
    const urlString = window.location.href
    const url = new URL(urlString)
    if (url.search) {
      const type = url.searchParams.get('type')
      const token = url.searchParams.get('token')
      setRequest({ type, token })
      setPage(type)
    } else if (isSignedIn && !isConfirmed) {
      console.log('signedIn but not confirmed!')
      setPage('confirm')
    }
  }, [])

  const classes = useStyles()

  function Content() {
    switch (page) {
      case 'signIn':
        return <SignIn authenticate={authenticate} setPage={setPage} />
      case 'signUp':
        return <SignUp authenticate={authenticate} setPage={setPage} />
      case 'confirm':
        return <Confirm />
      case 'forgot':
        return <Forgot setPage={setPage} />
      case 'activate':
        return <Activate token={request.token} /> //type activate
      case 'reset':
        return <Reset token={request.token} />
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Content />
      </Grid>
    </Grid>
  )
}
