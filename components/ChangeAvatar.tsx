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
import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { getCookieFromBrowser } from '../apis/session'
import { generateStorageToken } from '../apis/storage/storage'
import { dataURLToFile, fileSizeIsBetween, generateFileName } from '../utils/files'

export const validImageExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

type ChangeAvatarProps = {
  children?: React.ReactChild
  onUpdateAvatar: (avatarUrl: string) => Promise<any>
}

export const ChangeAvatar = ({ children, onUpdateAvatar }: ChangeAvatarProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1.0)
  const [image, setImage] = useState<any>()
  const editor = useRef<any>()

  const classes = useStyles()

  const handleOpen = (event: any) => {
    try {
      const file = event.target.files[0]
      if (!file) return

      if (!fileSizeIsBetween(file.size, 4, 10 * 1024)) {
        enqueueSnackbar('File is too big', {
          variant: 'error',
        })
        return
      }

      if (!validImageExtensions.includes(file.type)) {
        enqueueSnackbar('File has not a valid extension', {
          variant: 'error',
        })
        return
      }

      setImage(file)
      setOpen(true)
    } catch {}
  }

  const handleClose = () => setOpen(false)

  const handleChangeScale = (_, newValue: number) => setScale(newValue)

  const handleSave = async () => {
    try {
      if (editor) {
        const canvas = editor.current.getImage().toDataURL()
        const imageFile = await dataURLToFile(canvas, 'avatar.png', 'image/png')

        const { url } = await generateStorageToken(
          {
            contentType: imageFile.type,
            key: generateFileName(imageFile),
          },
          getCookieFromBrowser('jwt')
        )

        await axios.put(url, imageFile, {
          headers: {
            'x-amz-acl': 'public-read',
            'Content-Type': imageFile.type,
          },
        })

        const urlS3 = url.substr(0, url.indexOf('?'))

        await onUpdateAvatar(urlS3)
        enqueueSnackbar('Avatar successful updated')
        handleClose()
      } else {
        throw new Error('Editor dont loaded successfully')
      }
    } catch (error) {
      enqueueSnackbar('Error ocurred' + error.message, {
        variant: 'error',
      })
      console.error(error)
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
