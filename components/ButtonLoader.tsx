import React from 'react'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'absolute',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const ButtonLoader = ({ children, loading, ...props }) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Button disabled={loading} {...props}>
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  )
}

export default ButtonLoader
