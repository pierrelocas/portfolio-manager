import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import Topbar from './Topbar'
import Sidebar from './Sidebar'

import Dashboard from '../Dashboard'
import Portfolios from '../Portfolios'
import Transactions from '../Transactions'
import Positions from '../Positions'
import Statistics from '../Statistics'
import Profile from '../Profile'

const GET_PORTFOLIOS = gql`
  {
    me {
      _id
      firstname
      lastname
      email
      confirmed
    }
    portfolios {
      _id
      name
      exchange
      currency
      favorite
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
}))

export default function Layout(props) {
  const { authenticate } = props
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('Dashboard')
  const [activePortfolio, setActivePortfolio] = useState()

  const {
    loading,
    error,
    data: { me, portfolios }
  } = useQuery(GET_PORTFOLIOS)

  if (loading) return <h3>Loading...</h3>

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  function handleSignOut() {
    localStorage.removeItem('token')
    authenticate()
  }

  if (!activePortfolio && portfolios) {
    const { _id } = portfolios.find(p => p.favorite)
    setActivePortfolio(_id)
  }
  console.log(activePortfolio)
  let content
  switch (title) {
    case 'Dashboard':
      content = <Dashboard />
      break
    case 'Portfolios':
      content = <Portfolios portfolios={portfolios} />
      break
    case 'Transactions':
      content = (
        <Transactions portfolios={portfolios} portfolioId={activePortfolio} />
      )
      break
    case 'Positions':
      content = (
        <Positions portfolios={portfolios} portfolioId={activePortfolio} />
      )
      break
    case 'Statistics':
      content = <Statistics />
      break
    case 'Profile':
      content = <Profile />
      break
    default:
      content = <h2>No selection</h2>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar
        handleDrawerOpen={handleDrawerOpen}
        title={title}
        handleSignOut={handleSignOut}
        open={open}
      />
      <Sidebar
        handleDrawerClose={handleDrawerClose}
        open={open}
        setTitle={setTitle}
        title={title}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {content}
        <MadeWithLove />
      </main>
    </div>
  )
}
