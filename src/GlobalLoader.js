import React from 'react'
import { useGlobalLoader } from '../hooks/useGlobalLoader'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    transition: '.4s',
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
})
const GlobalLoader = () => {
  const classes = useStyles()

  const { isLoading } = useGlobalLoader()
  return (
    <div className={clsx(classes.container, !isLoading ? classes.hide : null)}>
      {isLoading && <LinearProgress color="secondary" />}
    </div>
  )
}

export default GlobalLoader
