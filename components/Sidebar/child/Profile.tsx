import { Avatar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import Separator from '../../shared/Separator'

export const Profile = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  const user = {
    name: 'Shen Zhi',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    bio: 'Brain Director',
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} src={user.avatar} />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
      <Separator v={2} />
      <Link href={'/profile'} passHref>
        <Button
          className={classes.viewProfileBtn}
          size="small"
          variant="contained"
          color="primary"
        >
          Admin Profile
        </Button>
      </Link>
      <Separator v={6} />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  viewProfileBtn: {
    textTransform: 'capitalize',
    fontSize: 10,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}))
