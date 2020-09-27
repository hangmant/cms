import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks'
import { CardHeader, Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonAdd from '@material-ui/icons/PersonAdd'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { CREATE_MESSAGE_MUTATION, CHANGE_TYPING_INDICATOR_MUTATION } from '../../apollo/mutations'
import { GET_MESSAGES, GET_MY_ROOMS, GET_ROOM, GET_ROOM_USERS } from '../../apollo/queries'
import {
  MESSAGE_SUBSCRIPTION,
  TYPING_INDICATOR_CHANGED_SUBSCRIPTION,
} from '../../apollo/subscriptions'
import ChatMessageList, {
  ChatMessageListFunctions,
} from '../../components/Messages/ChatMessageList'
import { ChatRooms } from '../../components/Messages/ChatRooms'
import { ChatRoomsTitle } from '../../components/Messages/ChatRoomsTitle'
import { MessageInput } from '../../components/Messages/MessageInput'
import { AddUserToRoomModal } from '../../components/Messages/modals/AddUserToRoom'
import { RoomUsersSidebar } from '../../components/Messages/RoomUsersSidebar'
import { withAuthentication } from '../../hoc/Authenticate'
import { UsersTypingIndicator } from '../../components/Messages/UsersTypingIndicator'

function Messages({ user }) {
  const classes = useStyles()
  const router = useRouter()
  const messageListRef = useRef<ChatMessageListFunctions>(null)
  const [usersTyping, setUsersTyping] = useState([])

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
    onCompleted: () => {
      try {
        messageListRef.current.scrollToEnd()
      } catch {}
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
        setTimeout(() => {
          try {
            messageListRef.current.scrollToEnd()
          } catch (error) {
            console.log(error)
          }
        }, 10)

        return {
          messages: newMessages,
        }
      },
    })
  }, [])

  const messages = get(data, 'messages', [])

  const handleSendText = async (text: string) => {
    try {
      await createMessage({ variables: { data: { text, roomId } } })
    } catch (error) {
      console.log('Dante: handleSendText -> error', error)
    }
  }

  useSubscription(TYPING_INDICATOR_CHANGED_SUBSCRIPTION, {
    variables: {
      roomId,
    },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.typingIndicatorChanged) {
        const { isTyping, user } = data.typingIndicatorChanged
        if (isTyping) {
          setUsersTyping(prev => {
            const existsUser = prev.find(({ _id }) => _id === user._id)
            if (!existsUser) {
              return prev.concat(user)
            }
            return prev
          })
        } else {
          setUsersTyping(prev => prev.filter(({ _id }) => _id !== user._id))
        }
      }
    },
  })

  const [changeTypeingIndicator] = useMutation(CHANGE_TYPING_INDICATOR_MUTATION)

  const handleStartTyping = async isTyping => {
    try {
      changeTypeingIndicator({
        variables: {
          roomId,
          isTyping,
        },
      })
    } catch (error) {
      console.log('Dante: handleStartTyping -> error', error)
    }
  }

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
            <ChatMessageList ref={messageListRef} messages={messages} />
            <MessageInput
              handleStartTyping={() => handleStartTyping(true)}
              handleStopTyping={() => handleStartTyping(false)}
              handleSendText={handleSendText}
            />
            <UsersTypingIndicator users={usersTyping} myUserId={user._id} />
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
