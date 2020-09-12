import { useQuery } from '@apollo/react-hooks'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { GET_MY_ROOMS } from '../../apollo/queries'
import { ChatRooms } from '../../components/Messages/ChatRooms'
import { ChatRoomsTitle } from '../../components/Messages/ChatRoomsTitle'
import { CreateRoom } from '../../components/modals/CreateRoom'
import { withAuthentication } from '../../hoc/Authenticate'

function Messages() {
  const classes = useStyles()

  const { data: roomsData } = useQuery(GET_MY_ROOMS)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ChatRoomsTitle />
          <ChatRooms rooms={roomsData?.userRooms} />
        </Grid>
        <Grid item xs={8}>
          <div>
            <Typography variant="h5">Select a room</Typography>
            <Typography>or</Typography>
            <CreateRoom>
              {({ handleOpen }) => (
                <Button onClick={handleOpen} color="primary" variant="contained">
                  Create One
                </Button>
              )}
            </CreateRoom>
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
}))

export default withAuthentication(Messages)
