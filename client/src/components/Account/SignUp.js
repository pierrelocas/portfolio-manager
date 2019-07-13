import React, { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
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

const SIGN_UP = gql`
  mutation signUp($user: UserInput) {
    signUp(user: $user) {
      token
    }
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

export default function SignUp(props) {
  const { setSignedIn, setPage } = props
  const classes = useStyles()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signUp, { error, data }] = useMutation(SIGN_UP, {
    variables: {
      user: {
        firstname,
        lastname,
        email,
        password,
        language: 'enUS'
      }
    }
  })

  const handleSubmit = async event => {
    event.preventDefault()
    const {
      data: {
        signUp: { token }
      }
    } = await signUp()
    localStorage.setItem('token', token)
    setSignedIn(true)
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstname}
              onChange={event => setFirstname(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={lastname}
              onChange={event => setLastname(event.target.value)}
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={event => setPassword(event.target.value)}
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
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Link
            component="button"
            variant="body2"
            onClick={event => {
              event.preventDefault()
              console.log('here')
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
