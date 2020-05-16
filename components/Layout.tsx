import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import React from 'react'
import { GlobalContextProvider } from '../contexts/globalContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { User } from '../interfaces/user.interface'
import { Sidebar } from './Sidebar'
import { SIDEBAR_WIDTH } from './Sidebar/sidebar.constants'

type PersistentDrawerLeftProps = {
  children: any
  user: User
}

export default function PersistentDrawerLeft({
  children,
  user,
  ...props
}: PersistentDrawerLeftProps) {
  const [open, setOpen] = useLocalStorage('sidebar_open', true)
  const classes = useStyles({
    open,
  })

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <GlobalContextProvider>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar)}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Hangman CMS
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar user={user} open={open} onClose={handleDrawerClose} />
        <main className={clsx(classes.content)}>
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    </GlobalContextProvider>
  )
}

const useStyles = makeStyles<Theme, { open: boolean }>(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: props => `calc(100% - ${props.open ? SIDEBAR_WIDTH : 0}px)`,
    marginLeft: props => (props.open ? SIDEBAR_WIDTH : 'auto'),
    transition: props =>
      props.open
        ? theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          })
        : theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: props => (props.open ? 'none' : 'inherit'),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: props =>
      props.open
        ? theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          })
        : theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    // TODO: solve animation
    // marginLeft: props => (props.open ? 0 : -0),
  },
}))
