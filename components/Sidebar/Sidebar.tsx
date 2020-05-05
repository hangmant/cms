import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Router from 'next/router'
import React from 'react'
import { removeCookie } from '../../api/session'
import { noop } from '../../utils/shared.utils'
import { Profile } from './child/Profile'
import SidebarItem from './child/SidebarItem'
import SidebarNav from './child/SidebarNav'
import { SIDEBAR_WIDTH } from './sidebar.constants'
import { useApolloClient } from '@apollo/react-hooks'

type SidebarProps = {
  open?: boolean
  onClose?: Function
}

export const Sidebar = ({ open = false, onClose = noop }: SidebarProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const client = useApolloClient()

  const handleClose = () => {
    onClose(false)
  }

  const handleLogout = () => {
    console.log('Removing cookie and reset store')
    removeCookie('jwt')
    // Router.replace('/login')
    client.restore({})
    client.resetStore()
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Profile />
      <Divider />
      <SidebarNav />
      <Divider />
      <ListItem disableGutters>
        <SidebarItem onClick={handleLogout} title="Logout" IconComponent={ExitToAppIcon} />
      </ListItem>
    </Drawer>
  )
}

const useStyles = makeStyles(theme => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    paddingLeft: 10,
    paddingRight: 10,
    width: SIDEBAR_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}))
