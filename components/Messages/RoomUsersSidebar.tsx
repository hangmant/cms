import { User } from '../../interfaces/user.interface'
import { Avatar, makeStyles, Badge } from '@material-ui/core'

type RoomUsersSidebar = {
  users: User[]
}

export function RoomUsersSidebar({ users = [] }: RoomUsersSidebar) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {users.map((user, idx) => (
        <Badge
          overlap="circle"
          color="secondary"
          key={idx}
          badgeContent=" "
          classes={{
            badge: classes.badge,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={user.avatar} />
        </Badge>
      ))}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    width: 50,
    padding: 10,
    border: '1px solid #eeeeee',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
  },
  badge: {
    color: (props: any) => (props?.isActive ? '#44b700 !important' : 'gray !important'),
    backgroundColor: (props: any) => (props?.isActive ? '#44b700 !important' : 'gray !important'),
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    border: '1px solid currentColor',
  },
}))
