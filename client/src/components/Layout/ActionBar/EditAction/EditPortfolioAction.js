import React, { useState, useEffect } from 'react'

import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import { green, orange } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  btnAdd: {
    backgroundColor: green[600],
    color: 'white'
  },
  btnDelete: {
    backgroundColor: theme.palette.error.dark,
    color: 'white'
  },
  btnUpdate: {
    backgroundColor: orange[600],
    color: 'white'
  }
}))

const CREATE_PORTFOLIO = gql`
  mutation createPortfolio($portfolio: PortfolioInput!) {
    createPortfolio(portfolio: $portfolio) {
      _id
      user_id
      name
      exchange
      currency
      favorite
      createdAt
      updatedAt
    }
  }
`
const UPDATE_PORTFOLIO = gql`
  mutation updatePortfolio($id: ID!, $update: PortfolioInput!) {
    updatePortfolio(id: $id, update: $update) {
      _id
      user_id
      name
      exchange
      currency
      favorite
      createdAt
      updatedAt
    }
  }
`

const DELETE_PORTFOLIO = gql`
  mutation deletePortfolio($id: ID!) {
    deletePortfolio(id: $id)
  }
`

const EditPortfolioAction = props => {
  const { page, QUERY, activePortfolio, setActivePortfolio, portfolios } = props
  const classes = useStyles()
  const intitialPortfolio = {
    name: '',
    exchange: '',
    currency: ''
  }
  const [newAction, setNewAction] = useState(false)
  const [portfolio, setPortfolio] = useState(intitialPortfolio)
  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    variables: { portfolio },
    update(
      cache,
      {
        data: { createPortfolio }
      }
    ) {
      const { me, portfolios, transactions } = cache.readQuery({
        query: QUERY,
        variables: { portfolioId: activePortfolio }
      })
      cache.writeQuery({
        query: QUERY,
        variables: { portfolioId: activePortfolio },
        data: {
          me,
          portfolios: portfolios.concat([createPortfolio]),
          transactions
        }
      })
    }
  })

  const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO, {
    variables: {
      id: activePortfolio,
      update: portfolio
    },
    update(
      cache,
      {
        data: { updatePortfolio }
      }
    ) {
      const { me, portfolios, transactions } = cache.readQuery({
        query: QUERY,
        variables: { portfolioId: activePortfolio }
      })
      console.log(updatePortfolio)
      cache.writeQuery({
        query: QUERY,
        variables: { portfolioId: activePortfolio },
        data: {
          me,
          portfolios: portfolios.map(p =>
            p._id === activePortfolio ? updatePortfolio : p
          ),
          transactions
        }
      })
    }
  })

  const [deletePortfolio] = useMutation(DELETE_PORTFOLIO, {
    variables: { id: activePortfolio },
    update(cache) {
      const { me, portfolios, transactions } = cache.readQuery({
        query: QUERY,
        variables: { portfolioId: activePortfolio }
      })
      cache.writeQuery({
        query: QUERY,
        variables: { portfolioId: activePortfolio },
        data: {
          me,
          portfolios: portfolios.filter(p => p._id !== activePortfolio),
          transactions
        }
      })
    }
  })

  useEffect(() => {
    const selectedPortfolio = portfolios.find(p => p._id === activePortfolio)
    if (!newAction) {
      setPortfolio(previousPortfolio => ({
        ...previousPortfolio,
        name: selectedPortfolio.name,
        exchange: selectedPortfolio.exchange,
        currency: selectedPortfolio.currency
      }))
    }
  }, [activePortfolio, newAction])

  const handleAction = (event, isChecked) => {
    isChecked && setPortfolio(intitialPortfolio)
    setNewAction(isChecked)
  }

  const handleChange = event => {
    event.persist()
    setPortfolio(previousState => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }

  // could handle both buttons here by the event target name & set action acordingly
  const handleSubmit = event => {
    switch (event.currentTarget.value) {
      case 'add':
        createPortfolio()
        break
      case 'update':
        console.log('update')
        updatePortfolio()
        break
      case 'clear':
        setPortfolio(intitialPortfolio)
        break
      case 'delete':
        deletePortfolio()
        setPortfolio(intitialPortfolio)
        const favorite = portfolios.find(p => p.favorite === true)
        setActivePortfolio(favorite._id)
        break
      default:
        console.log('unhandled action')
    }
  }

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <FormControlLabel
          labelPlacement="end"
          label="NEW"
          control={
            <Switch
              checked={newAction}
              onChange={handleAction}
              color="primary"
            />
          }
        />
        <FormHelperText>Select to create a new portfolio</FormHelperText>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="name"
          fullWidth
          id="name"
          label="Name"
          autoFocus
          value={portfolio.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="exchange"
          fullWidth
          id="exchange"
          label="Exchange"
          autoFocus
          value={portfolio.exchange}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="currency"
          fullWidth
          id="currency"
          label="Currency"
          autoFocus
          value={portfolio.currency}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          className={clsx(newAction ? classes.btnAdd : classes.btnUpdate)}
          value={newAction ? 'add' : 'update'}
          onClick={handleSubmit}
        >
          {newAction ? 'add' : 'update'}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          className={clsx(!newAction && classes.btnDelete)}
          value={newAction ? 'clear' : 'delete'}
          onClick={handleSubmit}
        >
          {newAction ? 'clear' : 'delete'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditPortfolioAction
