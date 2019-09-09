import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Title from './Title'

const useStyles = makeStyles(theme => ({
  portfolioContext: {
    flex: 1
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  active: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 3,
    borderBottomColor: theme.palette.primary.main
  }
}))

export default function Portfolio(props) {
  const {
    _id,
    name,
    exchange,
    currency,
    activePortfolio,
    setActivePortfolio
  } = props
  const classes = useStyles()

  return (
    <Paper
      className={clsx(
        classes.paper,
        classes.fixedHeight,
        _id == activePortfolio && classes.active
      )}
      elevation={5}
      onClick={() => setActivePortfolio(_id)}
    >
      <Title>{name}</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.portfolioContext}>
        on 15 March, 2019
      </Typography>
      <Typography color="textSecondary" className={classes.portfolioContext}>
        {exchange}
      </Typography>
      <Typography color="textSecondary" className={classes.portfolioContext}>
        {currency}
      </Typography>
      <div>
        {/* <Link color="primary" href="javascript:void(0)">
          View balance
        </Link> */}
        <h4>view balance</h4>
      </div>
    </Paper>
  )
}
