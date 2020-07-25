import { Grid, List, CardHeader, CardContent, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { ChatUserList } from '../../components/Messages/ChatUserList'
import { withAuthentication } from '../../hoc/Authenticate'
import ChatMessageGrouped from '../../components/Messages/ChatMessageGrouped'

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

const messagesGrouped = [
  {
    _id: 'lkasdjflkja',
    userId: 'iosadfasdlfk',
    userName: 'Tommy Shelby',
    avatar:
      'https://demo.uifort.com/carolina-react-admin-dashboard-pro-demo/static/media/people-2.8bb1c1e5.jpg',
    messages: [
      {
        _id: 'lkajsdlfka',
        body: 'Hola Dante como estas?',
        date: 'alskd',
      },
      {
        _id: 'lkajsdlfka',
        body: 'Queria confirmarte que llegare tarde a la reunion',
        date: 'alskd',
      },
    ],
  },
  {
    _id: 'lkasdjflkja',
    userId: 'iosadfc90asdlfk',
    userName: 'Dante Calderon',
    avatar: 'https://hangwoman-images.s3.amazonaws.com/2020-07-25T07-25-38-336Zavatar.png',
    messages: [
      {
        _id: 'lkajsdlfka',
        body: 'Mira que coincidencia, yo tambien',
        date: 'alskd',
      },
    ],
  },
]

function Words() {
  const classes = useStyles()

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
              {messagesGrouped.map(messageGrouped => (
                <ChatMessageGrouped messageGrouped={messageGrouped} />
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
