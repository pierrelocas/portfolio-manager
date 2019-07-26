import React, { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import FormControlLabel from '@material-ui/core/FormControlLabel'
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

const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
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

export default function Reset(props) {
  const { token } = props

  const classes = useStyles()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [resetPassword, { error, data }] = useMutation(RESET_PASSWORD, {
    variables: {
      token,
      password
    }
  })

  const handleSubmit = async event => {
    event.preventDefault()
    console.log('submitting...')
    const {
      data: { resetPassword: success }
    } = await resetPassword()
    console.log(await success)
    if (success) {
      alert(`Password updated successfully.`)
      window.location.replace('http://localhost:3000')
    } else {
      alert(`Failed, please verify that new password is valid and try again`)
    }
  }
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="confirm-password"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" />}
          label="I want to receive inspiration, marketing promotions and updates via email."
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update Password
        </Button>
        <Grid container justify="flex-end">
          <Link
            component="button"
            variant="body2"
            onClick={event => {
              event.preventDefault()
              setPage('signIn')
            }}
          >
            Already have an account? Sign in
          </Link>
        </Grid>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </form>
    </div>
  )
}
