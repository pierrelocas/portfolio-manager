import { format } from 'date-fns'
import React, { useState } from 'react'

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
  const { activePortfolio, QUERY } = props
  const classes = useStyles()
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [commission, setCommission] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
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
    setSelectedDate(date)
  }

  const submitTransaction = event => {
    const transaction = {
      portfolio_id: activePortfolio,
      date: format(selectedDate, 'MM/dd/yyyy H:mm:ss'),
      stock,
      quantity:
        event.currentTarget.value === 'sell'
          ? parseInt(-quantity)
          : parseInt(quantity),
      price: parseFloat(price),
      commission: parseFloat(commission)
    }
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
            value={selectedDate}
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
            value={stock}
            onChange={event => setStock(event.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="description"
            fullWidth
            id="description"
            label="Description"
            autoFocus
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="quantity"
            label="Quantity"
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="price"
            label="Price"
            value={price}
            onChange={event => setPrice(event.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="commission"
            label="Commission"
            value={commission}
            onChange={event => setCommission(event.target.value)}
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
