import { useMutation, useQuery } from '@apollo/react-hooks'
import { CardHeader, Grid, List, TextField, IconButton, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonAdd from '@material-ui/icons/PersonAdd'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CREATE_MESSAGE_MUTATION } from '../../apollo/mutations'
import { GET_MESSAGES, GET_MY_ROOMS, GET_ROOM, GET_ROOM_USERS } from '../../apollo/queries'
import { MESSAGE_SUBSCRIPTION } from '../../apollo/subscriptions'
import { ChatMessage } from '../../components/Messages/ChatMessage'
import { ChatRooms } from '../../components/Messages/ChatRooms'
import { ChatRoomsTitle } from '../../components/Messages/ChatRoomsTitle'
import { withAuthentication } from '../../hoc/Authenticate'
import { AddUserToRoomModal } from '../../components/Messages/modals/AddUserToRoom'
import { RoomUsersSidebar } from '../../components/Messages/RoomUsersSidebar'

function Messages() {
  const classes = useStyles()
  const router = useRouter()
  const [text, setText] = useState('')

  const { roomId } = router.query
  const { data: dataRoom } = useQuery(GET_ROOM, {
    variables: {
      _id: roomId,
    },
  })

  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  const { data, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: {
      roomId,
    },
  })

  const { data: roomUsersData } = useQuery(GET_ROOM_USERS, {
    variables: {
      roomId,
    },
  })

  const { data: roomsData } = useQuery(GET_MY_ROOMS)

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: {
        roomId,
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
      await createMessage({ variables: { data: { text, roomId } } })
      setText('')
    }
  }

  const messages = get(data, 'messages', [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ChatRoomsTitle />
          <ChatRooms rooms={roomsData?.userRooms} />
        </Grid>
        <Grid item xs={8}>
          <div>
            <CardHeader
              title={dataRoom?.room?.name ?? '...'}
              subheader="Messages"
              action={
                <AddUserToRoomModal roomId={roomId as string}>
                  {({ handleOpen }) => (
                    <IconButton aria-label="add-user-to-room" onClick={handleOpen}>
                      <PersonAdd />
                    </IconButton>
                  )}
                </AddUserToRoomModal>
              }
            />
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
      <RoomUsersSidebar users={roomUsersData?.roomUsers} />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
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

export default withAuthentication(Messages)
