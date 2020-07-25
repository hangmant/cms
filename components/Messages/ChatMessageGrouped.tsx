import { Avatar, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ChatMessage from './ChatMessage'

function ChatMessageGrouped({ messageGrouped }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <Avatar variant="rounded" src={messageGrouped.avatar} />
      </div>
      <div className={classes.body}>
        <div>
          <Typography>{messageGrouped.userName}</Typography>
        </div>
        {messageGrouped.messages.map(message => (
          <ChatMessage message={message} />
        ))}
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

export default ChatMessageGrouped
