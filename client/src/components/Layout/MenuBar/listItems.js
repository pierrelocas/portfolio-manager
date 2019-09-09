import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import PieChart from '@material-ui/icons/PieChart'
import BarChartIcon from '@material-ui/icons/BarChart'
import Briefcase from 'mdi-material-ui/Briefcase'
import Wallet from 'mdi-material-ui/Wallet'
import Finance from 'mdi-material-ui/Finance'
import AccountSetting from 'mdi-material-ui/AccountSettings'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'

// TODO : Create an array and maps listitems
export function MainListItems(props) {
  const { setPage, page } = props
  return (
    <div>
      <ListItem
        button
        onClick={() => setPage('Dashboard')}
        selected={page === 'Dashboard'}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem
        button
        onClick={() => setPage('Portfolios')}
        selected={page === 'Portfolios'}
      >
        <ListItemIcon>
          <Briefcase />
        </ListItemIcon>
        <ListItemText primary="Portfolios" />
      </ListItem>

      <ListItem
        button
        onClick={() => setPage('Positions')}
        selected={page === 'Positions'}
      >
        <ListItemIcon>
          <Wallet />
        </ListItemIcon>
        <ListItemText primary="Positions" />
      </ListItem>

      <ListItem
        button
        onClick={() => setPage('Transactions')}
        selected={page === 'Transactions'}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItem>

      <ListItem
        button
        onClick={() => setPage('Statistics')}
        selected={page === 'Statistics'}
      >
        <ListItemIcon>
          <PieChart />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItem>

      <ListItem
        button
        onClick={() => setPage('Profile')}
        selected={page === 'Profile'}
      >
        <ListItemIcon>
          <AccountSetting />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>

      <ListItem
        button
        onClick={() => setPage('Market')}
        selected={page === 'Market'}
      >
        <ListItemIcon>
          <Finance />
        </ListItemIcon>
        <ListItemText primary="Market" />
      </ListItem>
    </div>
  )
}

export function SecondaryListItems() {
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  )
}
