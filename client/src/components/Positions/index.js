import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Title from '../Dashboard/Title'
// import Transaction from './Transaction'

const GET_TRANSACTIONS = gql`
  query transactions($portfolioId: ID!) {
    transactions(portfolioId: $portfolioId) {
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

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

const FormatCurrency = props => {
  const { children } = props
  const options = { style: 'currency', currency: 'USD' }
  return children.toLocaleString('en-US', options)
}

const FormatDateTime = props => {
  const { children } = props
  const locale = 'en-US'
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  return new Date(parseInt(children)).toLocaleString(locale, options)
}

const Positions = props => {
  const { portfolios, portfolioId } = props
  const classes = useStyles()

  const {
    loading,
    error,
    data: { transactions }
  } = useQuery(GET_TRANSACTIONS, {
    variables: { portfolioId }
  })
  if (loading) return <h3>Loading...</h3>
  if (error) return <h3>{error}</h3>
  // console.log(transactions)
  const stocks = transactions.map(t => t.stock)

  const distinctStocks = [...new Set(stocks)]

  // console.log(stocks)
  // console.log(distinctStocks)
  // const transac
  const positions = []

  const getNetPrice = (quantity, price, commission) =>
    (quantity * price + commission) / quantity

  for (const s of distinctStocks) {
    const transac = transactions
      .filter(t => t.stock === s)
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .reduce(
        (acc, curr) => {
          if (curr.quantity > 0) {
            // Buying ...
            const netCurrPrice = getNetPrice(
              curr.quantity,
              -curr.price,
              -curr.commission
            ) // Negative value when buying
            if (acc.quantity > 0) {
              // have some, buying more
              acc.price =
                (acc.quantity * acc.price + curr.quantity * netCurrPrice) /
                (acc.quantity + curr.quantity)
            } else {
              acc.price = netCurrPrice
            }
          } else {
            // selling ...
            const netCurrPrice = getNetPrice(
              curr.quantity,
              curr.price,
              curr.commission
            ) // Positive value when selling
            acc.gain_loss +=
              Math.abs(curr.quantity) * (netCurrPrice + acc.price)
          }

          acc.quantity += curr.quantity
          return acc
        },
        { quantity: 0, price: 0, gain_loss: 0 }
      )

    transac.stock = s
    positions.push(transac)
  }

  // TODO : Might want to include commission paid and number of transactions
  console.log(positions)
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Positions</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Gain/Loss</TableCell>
                  <TableCell align="right">Net Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {positions.map(p => (
                  <TableRow key={p.stock}>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>{p.stock} - desc</TableCell>
                    <TableCell align="right">{p.quantity}</TableCell>
                    <TableCell align="right">
                      <FormatCurrency>{p.price}</FormatCurrency>
                    </TableCell>
                    <TableCell align="right">
                      <FormatCurrency>{p.gain_loss}</FormatCurrency>
                    </TableCell>
                    <TableCell align="right">
                      <FormatCurrency>{p.quantity * p.price}</FormatCurrency>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Positions
