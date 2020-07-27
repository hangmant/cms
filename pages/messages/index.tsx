import { Grid, List, CardHeader, CardContent, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { ChatUserList } from '../../components/Messages/ChatUserList'
import { withAuthentication } from '../../hoc/Authenticate'
import { ChatMessage } from '../../components/Messages/ChatMessage'
import { useSubscription } from '@apollo/react-hooks'
import { MESSAGE_SUBSCRIPTION } from '../../apollo/subscriptions'
import { Message } from '../../interfaces/chat/message.interface'

const users: any[] = [
  {
    _id: 'alsdf',
    name: 'Dante Calderon',
    avatar: 'https://hangwoman-images.s3.amazonaws.com/2020-07-25T07-25-38-336Zavatar.png',
    email: 'dantehemerson@gmail.com',
    isActive: true,
  },
  {
    _id: '9a0sd',
    name: 'Freddy JI',
    avatar:
      'https://demo.uifort.com/carolina-react-admin-dashboard-pro-demo/static/media/people-2.8bb1c1e5.jpg',
    email: 'freddy@gmail.com',
    isActive: false,
  },
]

const initialMessages: Message[] = [
  {
    _id: 'lkasdjflkja',
    fromUser: 'iosadfasdlfk',
    text: 'laksdjf',
    html: 'asdlfkj',
    roomId: 'alksdfj',
  },
  {
    _id: 'lkasdjflkja',
    fromUser: 'iosadfasdlfk',
    text: 'laksdjf',
    html: 'Hola Nuevamente',
    roomId: 'alksdfj',
  },
]

function Words() {
  const classes = useStyles()

  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION)

  const [messages, setMessages] = useState(initialMessages)

  useEffect(() => {
    if (data?.messageCreated) {
      console.log('New message', data?.messageCreated)
      setMessages([...messages, data.messageCreated])
    }
  }, [data])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <List>
            {users.map(user => (
              <ChatUserList user={user} />
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <div>
            <CardHeader title="MESSAGE" subheader="Message to Dante Calderon" />
            <div
              style={{
                height: 550,
              }}
              className="messages-here"
            >
              {messages.map(message => (
                <ChatMessage message={message} />
              ))}
            </div>
            <TextField
              placeholder="Click here to type a chat message. Supports GitHub flavoured markdown."
              rowsMax={5}
              fullWidth
              // multiline
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    maxHeight: 800,
  },
}))

export default withAuthentication(Words)
