import { Avatar, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Message } from '../../interfaces/chat/message.interface'

type ChatMessageProps = {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <Avatar variant="rounded" src="" />
      </div>
      <div className={classes.body}>
        <div>
          <Typography>{message.fromUser}</Typography>
        </div>
        <div>{message.text}</div>
      </div>
    </div>
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
