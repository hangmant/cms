import React, { useState } from 'react'
import {
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  DialogActions,
  Button,
  Divider,
  Slider,
  withStyles,
} from '@material-ui/core'
import AvatarEditor from 'react-avatar-editor'
import { graphqlSync } from 'graphql'

export const ChangeAvatar = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true)
  const [scale, setScale] = useState<number>(1.0)
  console.log('Dante: ChangeAvatar -> scale', scale)

  const classes = useStyles()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChangeScale = (_, newValue: number) => {
    setScale(newValue)
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Avatar</DialogTitle>
        <Divider />
        <div>
          <AvatarEditor
            image="https://www.w3schools.com/howto/img_avatar.png"
            width={300}
            height={300}
            style={{
              background: '#f3f3f3',
            }}
            border={20}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={0}
          />
          <div className={classes.sliderContainer}>
            <MonitoSlider
              onChange={handleChangeScale}
              defaultValue={1}
              min={1}
              max={2}
              step={0.01}
            />
          </div>
          <Divider />
        </div>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {children({ handleOpen })}
    </React.Fragment>
  )
}

const MonitoSlider = withStyles(theme => ({
  root: {
    color: theme.palette.primary[400],
    height: 6,
    maxWidth: 200,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -7,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    borderRadius: 4,
  },
}))(Slider)

const useStyles = makeStyles(theme => ({
  sliderContainer: {
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 6,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
    paddingLeft: 25,
  },
}))
