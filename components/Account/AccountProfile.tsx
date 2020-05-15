import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  LinearProgress,
  Theme,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import moment from 'moment'
import React from 'react'
import { User } from '../../interfaces/user.interface'
import { ChangeAvatar } from '../ChangeAvatar'
import { ReqUpdateUser } from '../../interfaces/req-update-user.interface'

type AccountProfileProps = {
  className?: any
  user: User
  onUpdateUser: (user: ReqUpdateUser) => any
}

export const AccountProfile = (props: AccountProfileProps) => {
  const { className, user: authUser, onUpdateUser, ...rest } = props
  console.log('Dante: AccountProfile -> authUser', authUser)

  const classes = useStyles()

  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    ...authUser,
  }

  const onUpdateAvatar = async (avatarUrl: string) => onUpdateUser({ avatar: avatarUrl })

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {user.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {user.city}, {user.country}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={user.avatar} />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant="determinate" />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <ChangeAvatar onUpdateAvatar={onUpdateAvatar}>
          <Button
            component="span"
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Upload picture
          </Button>
        </ChangeAvatar>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}))
