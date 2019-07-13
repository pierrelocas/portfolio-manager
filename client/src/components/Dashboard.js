import React from 'react'
import { Button } from '@material-ui/core'

// check if email if confirm(if not resend?)
const Dashboard = props => {
  const { setSignedIn } = props

  function handleSignIn() {
    console.log('Dashboard')
    localStorage.removeItem('token')
    setSignedIn(false)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleSignIn}>Sign out</Button>
    </div>
  )
}

export default Dashboard
