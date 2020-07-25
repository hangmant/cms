import { Grid, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { ChatUserList } from '../../components/Messages/ChatUserList'
import { withAuthentication } from '../../hoc/Authenticate'

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
          {' '}
          COmo estan
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
