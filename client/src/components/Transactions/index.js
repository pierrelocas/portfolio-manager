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
import Transaction from './Transaction'

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

const Transactions = props => {
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

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Transactions</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Commission</TableCell>
                  <TableCell align="right">Net Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(t => (
                  <TableRow key={t._id}>
                    <TableCell>{t.quantity > 0 ? 'BUY' : 'SELL'}</TableCell>
                    <TableCell>{t.stock}</TableCell>
                    <TableCell>{t.stock} - desc</TableCell>
                    <TableCell>
                      <FormatDateTime>{t.date}</FormatDateTime>
                    </TableCell>
                    <TableCell align="right">{t.quantity}</TableCell>
                    <TableCell align="right">
                      <FormatCurrency>{t.price}</FormatCurrency>
                    </TableCell>
                    <TableCell align="right">
                      <FormatCurrency>{t.commission}</FormatCurrency>
                    </TableCell>
                    <TableCell align="right">
                      <FormatCurrency>
                        {t.quantity > 0
                          ? (t.quantity * -t.price + -t.commission) / t.quantity
                          : (t.quantity * t.price + t.commission) / t.quantity}
                      </FormatCurrency>
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
export default Transactions
