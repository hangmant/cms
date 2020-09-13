import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { GET_USERS, GET_ROOM_USERS } from '../../../apollo/queries'
import { User } from '../../../interfaces/user.interface'
import { CREATE_ROOM_USER_MUTATION } from '../../../apollo/mutations'

type CreateRoomProps = {
  children: Function
  roomId: string
}

export const AddUserToRoomModal = ({ children, roomId }: CreateRoomProps) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [search, setSearch] = useState('')

  const { data: dataUsers, loading } = useQuery(GET_USERS)
  const [addUserToRoom] = useMutation(CREATE_ROOM_USER_MUTATION, {
    refetchQueries: [
      {
        query: GET_ROOM_USERS,
        variables: {
          roomId,
        },
      },
    ],
  })

  const handleAddUserToRoom = async (userId: string) => {
    try {
      await addUserToRoom({
        variables: {
          data: {
            roomId,
            userId,
          },
        },
      })
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      })
    }
  }

  const handleOnChangeTitle = (event: any) => {
    setSearch(event.target.value)
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
        <DialogTitle>Add people to this room</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            label="Search for people"
            value={search}
            onChange={handleOnChangeTitle}
          />
          <List className={classes.list}>
            {(dataUsers?.users ?? []).map((user: User, idx) => (
              <ListItem divider key={idx}>
                <ListItemAvatar className={classes.avatarSmall}>
                  <Avatar alt={`Avatar ${user.firstName}`} src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.firstName} secondary={user.email} />
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => handleAddUserToRoom(user._id)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    Add
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Done
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
  list: {
    marginTop: 14,
    maxHeight: 300,
    overflowY: 'scroll',
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  inputFile: {
    display: 'none',
  },
}))
