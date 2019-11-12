import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Portfolio from './Portfolio'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const Portfolios = props => {
  const { portfolios, activePortfolio, handlePortfolioChange } = props
  const classes = useStyles()
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {portfolios.map(portfolio => (
          <Grid item xs={12} md={4} lg={3} key={portfolio._id}>
            <Portfolio
              {...portfolio}
              activePortfolio={activePortfolio}
              handlePortfolioChange={handlePortfolioChange}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Portfolios
