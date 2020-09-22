import { Avatar, ListItem, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Message } from '../../interfaces/chat/message.interface'
import { parseMessageDate } from '../../helpers/dates.helpers'

type ChatMessageProps = {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const classes = useStyles()

  const { fullDate, messageDate } = parseMessageDate(message.createdAt, message.text)
  return (
    <ListItem className={classes.container}>
      <div>
        <Avatar variant="rounded" src={message.fromUser.avatar} />
      </div>
      <div className={classes.body}>
        <div className={classes.byContainer}>
          <Typography className={classes.by}>{message.fromUser.firstName}</Typography>
          <p className={classes.messageDate} title={fullDate}>
            {messageDate}
          </p>
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
  by: {
    fontSize: 12,
    fontWeight: 500,
  },
  byContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  messageDate: {
    margin: 0,
    fontSize: 10,
    color: '#808080',
    paddingLeft: 6,
  },
  body: {
    paddingLeft: 10,
  },
}))
