import React from 'react'
import { makeStyles } from '@material-ui/core'
const phoneLayout = require('../assets/images/iphone.png')

const useStyles = makeStyles({
  image: {
    position: 'absolute',
  },
  container: {
    margin: '0 30px',
    position: 'relative',
  },
  statusBar: {
    position: 'absolute',
    left: 20,
    top: 18,
    width: 261,
    height: 22,
  },
  content: {
    position: 'absolute',
    left: 20,
    top: 39,
    width: 261,
    height: 544,
  },
})

const Phone = ({ width = 300, statusBarColor = 'gray', children }) => {
  const classes = useStyles()

  return (
    <div
      className={classes.container}
      style={{
        width,
      }}
    >
      <div
        className={classes.statusBar}
        style={{
          backgroundColor: statusBarColor,
        }}
      ></div>
      <div className={classes.content}>{children}</div>
      <img className={classes.image} width={width} src={phoneLayout} alt="phone" />
    </div>
  )
}

export default Phone
