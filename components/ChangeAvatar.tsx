import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  makeStyles,
  Slider,
  withStyles,
} from '@material-ui/core'
import React, { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { fileSizeIsBetween } from '../utils/files'

export const validImageExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export const ChangeAvatar = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1.0)
  const [image, setImage] = useState<string>('')
  const [resultImage, setResultImage] = useState<string>('')
  const editor = useRef<any>()
  console.log('Dante: ChangeAvatar -> editor', editor)

  const classes = useStyles()

  const handleOpen = (event: any) => {
    try {
      const file = event.target.files[0]
      if (!file) return

      if (!fileSizeIsBetween(file.size, 4, 20 * 1024)) {
        console.error('File is too big')
        return
      }

      if (!validImageExtensions.includes(file.type)) {
        console.error('File has not a valid extension')
        return
      }

      setImage(file)
      setOpen(true)
    } catch {}
  }

  const handleClose = () => setOpen(false)

  const handleChangeScale = (_, newValue: number) => {
    setScale(newValue)
  }

  const handleSave = () => {
    if (editor) {
      const canvas = editor.current.getImage().toDataURL()
      let imageURL
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => {
          imageURL = window.URL.createObjectURL(blob)
          console.log('Dante: handleSave -> imageURL', imageURL)
        })
      setResultImage(canvas)
      console.log('Dante: handleSave -> canvas', canvas)
      const canvasScaled = editor.current.getImageScaledToCanvas()
      console.log('Dante: handleSave -> canvasScaled', canvasScaled)
    } else {
      console.error('Editor dont loaded successfully')
    }
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Avatar</DialogTitle>
        <Divider />
        <div>
          <AvatarEditor
            image={image}
            ref={editor}
            width={400}
            height={400}
            style={{
              background: '#f3f3f3',
            }}
            border={20}
            color={[255, 255, 255, 0.6]}
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
          <img src={resultImage} width={100} />
        </div>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <input
        accept="image/*"
        className={classes.inputFile}
        id="avatar-button-file"
        multiple
        type="file"
        onChange={handleOpen}
      />
      {/** Make sure of add  component="span" property to children component */}
      <label htmlFor="avatar-button-file">{children}</label>
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
  inputFile: {
    display: 'none',
  },
}))