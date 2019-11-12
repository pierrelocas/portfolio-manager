import { format } from 'date-fns'
import React, { useState, useEffect } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
import { CalendarClock, ConsoleNetworkOutline } from 'mdi-material-ui'

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
    color: 'white'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: 'white'
  }
}))

const CREATE_TRANSACTION = gql`
  mutation createTransaction($transaction: TransactionInput!) {
    createTransaction(transaction: $transaction) {
      _id
      portfolio_id
      date
      stock
      quantity
      price
      commission
      createdAt
      updatedAt
    }
  }
`

function TransactionAction(props) {
  const { activePortfolio, transactions, selectedTransactionId, QUERY } = props
  const classes = useStyles()

  const initialTransaction = {
    date: new Date(),
    stock: '',
    description: '',
    quantity: '',
    price: '',
    commission: ''
  }

  const [currentTransaction, setCurrentTransaction] = useState(
    initialTransaction
  )

  const formatDateTime = date => {
    const locale = 'en-US'
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    return new Date(parseInt(date)).toLocaleString(locale, options)
  }

  useEffect(() => {
    if (selectedTransactionId) {
      console.log(selectedTransactionId, transactions)
      // if (transactions) {
      // const { date, stock, quantity, price, commission } = transactions.find(
      //   t => t._id === selectedTransactionId
      // )
      // setCurrentTransaction(previous => ({
      //   ...previous,
      //   date: new Date(formatDateTime(date)),
      //   stock,
      //   description: `${stock} - Desc`,
      //   quantity: Math.abs(quantity),
      //   price,
      //   commission
      // }))
      // }
    }
  }, [selectedTransactionId, transactions])

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    update(
      cache,
      {
        data: { createTransaction }
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
          portfolios,
          transactions: transactions.concat([createTransaction])
        }
      })
    }
  })

  function handleDateChange(date) {
    console.log('date from handleDateChange', date)
    setCurrentTransaction(previous => ({ ...previous, date }))
  }

  function handleChange(event) {
    const { name, value } = event.target
    setCurrentTransaction(previous => ({ ...previous, [name]: value }))
  }

  const submitTransaction = event => {
    const {
      date,
      stock,
      description,
      quantity,
      price,
      commission
    } = currentTransaction
    const transaction = {
      portfolio_id: activePortfolio,
      date: format(date, 'MM/dd/yyyy H:mm:ss'),
      stock,
      quantity:
        event.currentTarget.value === 'sell'
          ? parseInt(-quantity)
          : parseInt(quantity),
      price: parseFloat(price),
      commission: parseFloat(commission)
    }
    console.log(transaction)
    createTransaction({
      variables: {
        transaction
      }
    })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DateTimePicker
            label="Date &amp; Time"
            value={currentTransaction.date}
            onChange={handleDateChange}
            showTodayButton
            fullWidth
            format="MMM d, yyyy,  H:mm:ss"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="stock"
            fullWidth
            id="stock"
            label="Stock"
            autoFocus
            value={currentTransaction.stock}
            onChange={event => handleChange(event)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="description"
            fullWidth
            id="description"
            label="Description"
            autoFocus
            value={currentTransaction.description}
            onChange={event => handleChange(event)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="quantity"
            name="quantity"
            label="Quantity"
            value={currentTransaction.quantity}
            onChange={event => handleChange(event)}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="price"
            name="price"
            label="Price"
            value={currentTransaction.price}
            onChange={event => handleChange(event)}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="commission"
            name="commission"
            label="Commission"
            value={currentTransaction.commission}
            onChange={event => handleChange(event)}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            size="small"
            variant="contained"
            fullWidth
            className={classes.success}
            value="buy"
            onClick={submitTransaction}
          >
            BUY
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="small"
            variant="contained"
            fullWidth
            className={classes.error}
            value="sell"
            onClick={submitTransaction}
          >
            SELL
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default TransactionAction
