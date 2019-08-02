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
  const { setTitle, title } = props
  console.log(title)
  return (
    <div>
      <ListItem
        button
        onClick={() => setTitle('Dashboard')}
        selected={title === 'Dashboard'}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem
        button
        onClick={() => setTitle('Portfolios')}
        selected={title === 'Portfolios'}
      >
        <ListItemIcon>
          <Briefcase />
        </ListItemIcon>
        <ListItemText primary="Portfolios" />
      </ListItem>

      <ListItem
        button
        onClick={() => setTitle('Positions')}
        selected={title === 'Positions'}
      >
        <ListItemIcon>
          <Wallet />
        </ListItemIcon>
        <ListItemText primary="Positions" />
      </ListItem>

      <ListItem
        button
        onClick={() => setTitle('Transactions')}
        selected={title === 'Transactions'}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItem>

      <ListItem
        button
        onClick={() => setTitle('Statistics')}
        selected={title === 'Statistics'}
      >
        <ListItemIcon>
          <PieChart />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItem>

      <ListItem
        button
        onClick={() => setTitle('Profile')}
        selected={title === 'Profile'}
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
        onClick={() => setTitle('Market')}
        selected={title === 'Market'}
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
