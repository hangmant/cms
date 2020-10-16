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
import NextLink from 'next/link'
import React from 'react'
import { Room } from '../../interfaces/chat/room.interface'

type ChatRoomsProps = {
  room: Room
}

export function ChatRoomsItem({ room }: ChatRoomsProps) {
  const classes = useStyles({ isActive: room._id })
  return (
    <NextLink href={`/messages/[roomId]`} as={`/messages/${room._id}`}>
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
            <Avatar
              alt={`Room logo`}
              src={
                'https://dcassetcdn.com/design_img/1559024/551167/551167_7840631_1559024_911ff84c_image.png'
              }
            />
          </Badge>
        </ListItemAvatar>
        <ListItemText primary={room.name} />
        <ListItemSecondaryAction>
          <ChevronRightIcon />
        </ListItemSecondaryAction>
      </ListItem>
    </NextLink>
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
