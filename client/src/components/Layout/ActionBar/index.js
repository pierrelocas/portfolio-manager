import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SwapHorizontalBold from 'mdi-material-ui/SwapHorizontalBold'
import CartArrowDown from 'mdi-material-ui/CartArrowDown'
import EditIcon from '@material-ui/icons/Edit'
import SettingsIcon from '@material-ui/icons/Settings'

import PortfolioAction from './PortfolioAction'
import TransactionAction from './TransactionAction'

import { actionWidth } from '../config'

const useStyles = makeStyles(theme => ({
  root: {
    width: actionWidth
  },
  paper: {
    height: theme.spacing(7),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paperCompact: {
    flexDirection: 'row-reverse' // Only reverse when in compact mode
  },
  expSummary: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
    margin: 'auto',
    paddingLeft: theme.spacing(2)
  }
}))

export default function ActionBar(props) {
  const {
    portfolios,
    activePortfolio,
    setActivePortfolio,
    QUERY,
    setActionOn,
    actionOn
  } = props

  const initialExpanded = {
    portfolio: false,
    edit: false,
    transaction: false,
    setting: false
  }

  const classes = useStyles()
  const [expanded, setExpanded] = useState(initialExpanded)

  const handleActionOn = () => {
    if (actionOn) setExpanded(initialExpanded)
    setActionOn(previousState => !previousState)
  }

  const handleChange = panel => (event, isExpanded) => {
    if (isExpanded && !actionOn) handleActionOn()
    setExpanded({ ...expanded, [panel]: isExpanded })
  }

  return (
    <div className={classes.root}>
      <Paper className={clsx(classes.paper, !actionOn && classes.paperCompact)}>
        <Typography component="h2" variant="h6" color="primary">
          Actions
        </Typography>
        <IconButton size="small" color="primary" onClick={handleActionOn}>
          {actionOn ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Paper>
      <ExpansionPanel
        expanded={expanded.portfolio}
        onChange={handleChange('portfolio')}
      >
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size="small">
            <SwapHorizontalBold color="action" />
          </IconButton>
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
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size="small">
            <CartArrowDown color="action" />
          </IconButton>

          <Typography className={classes.heading}>Transaction</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TransactionAction activePortfolio={activePortfolio} QUERY={QUERY} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded.edit} onChange={handleChange('edit')}>
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size="small">
            <EditIcon color="action" />
          </IconButton>
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
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size="small">
            <SettingsIcon color="action" />
          </IconButton>
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
