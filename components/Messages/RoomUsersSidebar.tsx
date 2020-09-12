import { User } from '../../interfaces/user.interface'
import { Avatar, makeStyles } from '@material-ui/core'

type RoomUsersSidebar = {
  users: User[]
}

export function RoomUsersSidebar({ users = [] }: RoomUsersSidebar) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {users.map((user, idx) => (
        <Avatar key={idx} alt="Remy Sharp" src={user.avatar} />
      ))}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    width: 50,
    padding: 10,
    border: '1px solid #eeeeee',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    background: 'white',
  },
}))
