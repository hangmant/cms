import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { window } from 'browser-monads'
import NextLink from 'next/link'
import Router from 'next/router'
import React from 'react'
import { noop } from '../../utils/shared.utils'
import { SIDEBAR_ITEMS, SIDEBAR_WIDTH } from './sidebar.constants'

type SidebarProps = {
  open?: boolean
  onClose?: Function
}

export const Sidebar = ({ open = false, onClose = noop }: SidebarProps) => {
  const classes = useStyles()
  const theme = useTheme()

  const handleClose = () => {
    onClose(false)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    Router.replace('/login')
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
      <Divider />
      <List>
        {SIDEBAR_ITEMS.map((menuItem, index) => (
          <NextLink key={index} href={menuItem.to} passHref>
            <ListItem component="a" button>
              <ListItemIcon>
                <menuItem.icon />
              </ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
          </NextLink>
        ))}
      </List>
      <Divider />
      <ListItem onClick={handleLogout} component="a" button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={'Logout'} />
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
