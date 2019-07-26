import React, { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const RESET_PASSWORD_REQUEST = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email)
  }
`

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  )
}

export default function Forgot(props) {
  const { setPage } = props
  const classes = useStyles()

  const [email, setEmail] = useState('')

  const [resetPasswordRequest, { error, data }] = useMutation(
    RESET_PASSWORD_REQUEST,
    {
      variables: {
        email
      }
    }
  )

  const handleSubmit = async event => {
    event.preventDefault()

    console.log(email)
    const {
      data: { resetPasswordRequest: success }
    } = await resetPasswordRequest()
    console.log(await success)
    success
      ? alert(`Procedure to change your password have been sent to <${email}>.`)
      : alert(`Failed, please verify the email and try again.`)
    // setSignedIn(true)
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset Password
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              component="button"
              variant="body2"
              onClick={event => {
                event.preventDefault()
                setPage('signIn')
              }}
            >
              Sign In
            </Link>
          </Grid>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={event => {
                event.preventDefault()
                setPage('signUp')
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </form>
    </div>
  )
}
