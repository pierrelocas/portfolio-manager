import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PortfolioAction from './PortfolioAction'
import TransactionAction from './TransactionAction'

import { actionWidth } from '../config'
import { height } from '@material-ui/system'

const useStyles = makeStyles(theme => ({
  root: {
    width: actionWidth
  },
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse' // Only reverse when in compact mode
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0
  }
}))

export default function ActionBar(props) {
  const { portfolios, activePortfolio, setActivePortfolio, QUERY } = props
  const classes = useStyles()
  const [expanded, setExpanded] = useState({
    portfolio: false,
    edit: false,
    transaction: false,
    setting: false
  })

  const handleChange = panel => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: isExpanded })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h6" color="primary">
          Actions
        </Typography>
        <IconButton
          size="small"
          onClick={() => console.log('minimizing Action bar')}
        >
          <ChevronRightIcon />
        </IconButton>
      </Paper>
      <ExpansionPanel
        expanded={expanded.portfolio}
        onChange={handleChange('portfolio')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Portfolio</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PortfolioAction
            portfolios={portfolios}
            activePortfolio={activePortfolio}
            setActivePortfolio={setActivePortfolio}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded.transaction}
        onChange={handleChange('transaction')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Transaction</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TransactionAction activePortfolio={activePortfolio} QUERY={QUERY} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded.edit} onChange={handleChange('edit')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Edit</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded.setting}
        onChange={handleChange('setting')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Advanced Settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
