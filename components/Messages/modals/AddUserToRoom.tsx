import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  TextField,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { GET_USERS } from '../../../apollo/queries'
import { User } from '../../../interfaces/user.interface'
import { ChevronRight } from '@material-ui/icons'

type CreateRoomProps = {
  children: Function
}

export const AddUserToRoomModal = ({ children }: CreateRoomProps) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [search, setSearch] = useState('')

  const { data: dataUsers, loading } = useQuery(GET_USERS, {
    variables: {},
  })

  const handleAddUserToRoom = async () => {
    try {
      setSearch('')
      handleClose()
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
            {(dataUsers?.users ?? []).map((user: User) => (
              <ListItem divider>
                <ListItemAvatar className={classes.avatarSmall}>
                  <Avatar alt={`Avatar ${user.firstName}`} src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.firstName} secondary={user.email} />
                <ListItemSecondaryAction>
                  <Button variant="outlined" color="secondary" size="small">
                    Add
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUserToRoom} color="primary" variant="contained">
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
