import { makeStyles } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import React from 'react'
import { SIDEBAR_ITEMS } from '../sidebar.constants'
import SidebarItem from './SidebarItem'

export const SidebarNav = () => {
  const classes = useStyles()

  return (
    <List>
      {SIDEBAR_ITEMS.map((menuItem, index) => (
        <ListItem key={index} className={classes.item} disableGutters>
          <SidebarItem to={menuItem.to} IconComponent={menuItem.icon} title={menuItem.title} />
        </ListItem>
      ))}
    </List>
  )
}

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
}))

export default SidebarNav
