import React from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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

export default function Transaction({ transac }) {
  const { _id, stock, date, quantity, price, commission } = transac
  return (
    <TableRow>
      <TableCell>{stock}</TableCell>
      <TableCell>{stock} - desc</TableCell>
      <TableCell>
        <FormatDateTime>{date}</FormatDateTime>
      </TableCell>
      <TableCell align="right">{quantity}</TableCell>
      <TableCell align="right">
        <FormatCurrency>{price}</FormatCurrency>
      </TableCell>
      <TableCell align="right">
        <FormatCurrency>{commission}</FormatCurrency>
      </TableCell>
      <TableCell align="right">
        <FormatCurrency>{quantity * price + commission}</FormatCurrency>
      </TableCell>
    </TableRow>
  )
}
