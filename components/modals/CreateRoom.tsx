import { useMutation } from '@apollo/react-hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { CREATE_ROOM_MUTATION, CREATE_ROOM_USER } from '../../apollo/mutations'
import { RoomType } from '../../enums/room-type.enum'
import { GET_MY_ROOMS } from '../../apollo/queries'

type CreateRoomProps = {
  children: Function
}

export const CreateRoom = ({ children }: CreateRoomProps) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [roomName, setRoomName] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const [createRoom] = useMutation(CREATE_ROOM_MUTATION, {
    variables: {
      data: {
        name: roomName,
        type: RoomType.OrgChannel,
      },
    },
  })

  const [createRoomUser] = useMutation(CREATE_ROOM_USER, {
    refetchQueries: [
      {
        query: GET_MY_ROOMS,
      },
    ],
  })

  const handleCreateRoom = async () => {
    try {
      const {
        data: { createRoom: response },
      } = await createRoom()

      const { data } = await createRoomUser({
        variables: {
          data: {
            roomId: response._id,
          },
        },
      })
      setRoomName('')
      handleClose()
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      })
    }
  }

  const handleOnChangeTitle = (event: any) => {
    setRoomName(event.target.value)
  }

  return (
    <React.Fragment>
      <Dialog
        classes={{
          paper: classes.container,
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create Room</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            value={roomName}
            onChange={handleOnChangeTitle}
            label="Name"
            variant="outlined"
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateRoom} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <label htmlFor="avatar-button-file">{children({ handleOpen })}</label>
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: 400,
  },
  sliderContainer: {
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 6,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
    paddingLeft: 25,
  },
  inputFile: {
    display: 'none',
  },
}))
