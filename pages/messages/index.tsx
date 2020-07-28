import { useQuery, useMutation } from '@apollo/react-hooks'
import { CardHeader, Grid, List, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'lodash'
import React, { Component, useEffect, useState } from 'react'
import { GET_MESSAGES } from '../../apollo/queries'
import { MESSAGE_SUBSCRIPTION } from '../../apollo/subscriptions'
import { ChatMessage } from '../../components/Messages/ChatMessage'
import { ChatUserList } from '../../components/Messages/ChatUserList'
import { withAuthentication } from '../../hoc/Authenticate'
import { CREATE_MESSAGE_MUTATION } from '../../apollo/mutations'

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

function Words() {
  const classes = useStyles()

  const [text, setText] = useState('')

  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  const { data, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: {
      roomId: '5f1de88ce74c21752cd96be2',
    },
  })

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: {
        roomId: '5f1de88ce74c21752cd96be2',
      },
      updateQuery: (previousData, { subscriptionData }) => {
        const newMessages = [...previousData.messages, subscriptionData.data.messageCreated]

        return {
          messages: newMessages,
        }
      },
    })
  }, [])

  const handleChangeText = event => {
    setText(event.target.value)
  }

  const handleKeyPress = async event => {
    if (event.key === 'Enter') {
      event.stopPropagation()
      await createMessage({ variables: { data: { text, roomId: '5f1de88ce74c21752cd96be2' } } })
      setText('')
    }
  }

  const messages = get(data, 'messages', [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <List>
            {users.map(user => (
              <ChatUserList key={user._id} user={user} />
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <div>
            <CardHeader title="MESSAGE" subheader="Message to Dante Calderon" />
            <List
              style={{
                height: 550,
                overflowY: 'scroll',
              }}
              className="messages-here"
            >
              {messages.map(message => (
                <ChatMessage key={message._id} message={message} />
              ))}
            </List>
            <TextField
              placeholder="Click here to type a chat message. Supports GitHub flavoured markdown."
              value={text}
              rowsMax={5}
              onKeyPress={handleKeyPress}
              onChange={handleChangeText}
              fullWidth
              multiline
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
