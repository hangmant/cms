import { Avatar, ListItem, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Message } from '../../interfaces/chat/message.interface'

type ChatMessageProps = {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const classes = useStyles()

  return (
    <ListItem className={classes.container}>
      <div>
        <Avatar variant="rounded" src={message.fromUser.avatar} />
      </div>
      <div className={classes.body}>
        <div>
          <Typography>{message.fromUser.firstName}</Typography>
        </div>
        <div dangerouslySetInnerHTML={{ __html: message.html }}></div>
      </div>
    </ListItem>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
  },
  body: {
    paddingLeft: 10,
  },
}))
