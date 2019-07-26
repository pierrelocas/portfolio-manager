import React, { useEffect } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

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
  }
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1)
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2)
  // }
}))

const CONFIRM_EMAIL = gql`
  mutation confirmEmail($token: String!) {
    confirmEmail(token: $token)
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

export default function Activate(props) {
  const { token } = props
  // console.log(token)

  const classes = useStyles()

  const [confirmEmail, { error, data }] = useMutation(CONFIRM_EMAIL, {
    variables: { token }
  })

  useEffect(() => {
    console.log(token)
    confirmEmail()
  }, [])

  console.log(data)
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Activate Account
      </Typography>
      {data ? <h3>Confirmed</h3> : <h3>Error</h3>}
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </div>
  )
}
