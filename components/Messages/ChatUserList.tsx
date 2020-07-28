import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import React from 'react'

type ChatUserListProps = {
  user: any
}

export function ChatUserList({ user }: ChatUserListProps) {
  const classes = useStyles({ isActive: user.isActive })
  return (
    <ListItem divider button>
      <ListItemAvatar className={classes.avatarSmall}>
        <Badge
          overlap="circle"
          color="secondary"
          badgeContent=" "
          classes={{
            badge: classes.badge,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar alt={`Avatar ${user.name}`} src={user.avatar} />
        </Badge>
      </ListItemAvatar>
      <ListItemText primary={user.name} secondary={user.email} />
      <ListItemSecondaryAction>
        <ChevronRightIcon />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles(theme => ({
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  badge: {
    color: (props: any) => (props?.isActive ? '#44b700 !important' : 'gray !important'),
    backgroundColor: (props: any) => (props?.isActive ? '#44b700 !important' : 'gray !important'),
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    border: '1px solid currentColor',
  },
}))
