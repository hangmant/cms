import { Typography, IconButton, makeStyles } from '@material-ui/core'
import Icon from '@material-ui/icons/AddCircleOutline'
import { CreateRoom } from '../modals/CreateRoom'

export function ChatRoomsTitle() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography>Rooms</Typography>
      <CreateRoom>
        {({ handleOpen }) => (
          <IconButton
            onClick={handleOpen}
            aria-label="create"
            className={classes.margin}
            size="small"
          >
            <Icon fontSize="inherit" />
          </IconButton>
        )}
      </CreateRoom>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))
