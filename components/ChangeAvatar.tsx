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
import { useSnackbar } from 'notistack'
import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { getCookieFromBrowser } from '../apis/session'
import { generateStorageToken } from '../apis/storage/storage'
import { fileSizeIsBetween } from '../utils/files'

export const validImageExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export const ChangeAvatar = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1.0)
  const [image, setImage] = useState<any>()
  const [resultImage, setResultImage] = useState<string>('')
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

  const handleChangeScale = (_, newValue: number) => {
    setScale(newValue)
  }

  const uploadFileToS3 = (presignedPostData, file) => {
    console.log('Dante: handleOpen -> file', file)
    console.log('Dante: handleOpen -> presignedPostData', presignedPostData)
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      Object.keys(presignedPostData.signature).forEach(key => {
        formData.append(key, presignedPostData.signature[key])
      })

      const buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ''), 'base64')

      // Actual file has to be appended last.
      formData.append('ContentEncoding', 'base64')
      formData.append('body', buf.toString())

      const xhr = new XMLHttpRequest()
      xhr.open('POST', presignedPostData.url, true)
      xhr.send(formData)
      xhr.onload = function () {
        this.status === 204 ? resolve() : reject(this.responseText)
      }
    })
  }

  const generateFileName = file => {
    let getDate = new Date()
    let timestamp = getDate.toISOString()
    timestamp = timestamp.replace(/:/g, '-')
    timestamp = timestamp.replace(/\./g, '-')

    return timestamp + file.name.replace(/ /g, '_')
  }

  const urltoFile = (url, filename, mimeType) => {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1]
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer()
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType })
      })
  }

  const handleSave = async () => {
    try {
      if (editor) {
        const canvas = editor.current.getImage().toDataURL()

        const imageFIle = await urltoFile(canvas, 'a.png', 'image/png')
        // console.log('Dante: handleSave -> res', res)

        const canvas222 = editor.current.getImage()
        const scalewd = editor.current.getImageScaledToCanvas()
        console.log('Dante: handleSave -> scalewd', scalewd)
        console.log('Dante: handleSave -> canvas222', canvas222)
        let imageURL
        fetch(canvas)
          .then(res => res.blob())
          .then(blob => (imageURL = window.URL.createObjectURL(blob)))
        console.log('Dante: handleSave -> imageURL', imageURL)
        // setResultImage(canvas)
        // const type = canvas.split(';')[0].split('/')[1]
        // const pre = await generateStorageToken(
        //   {
        //     contentType: `image/${type}`,
        //     key: `operator/hola.${type}`,
        //   },
        //   getCookieFromBrowser('jwt')
        // )

        // await upload(pre.url, canvas, pre.signature, {
        //   // 'Content-Encoding': 'base64',
        //   'x-amz-acl': 'public-read',
        //   'Content-Type': `image/${type}`,
        // })
        // await uploadFileToS3(pre, canvas)
        // await uploadFileToS3(pre, canvas)
      } else {
        console.error('Editor dont loaded successfully')
      }
    } catch (error) {
      enqueueSnackbar('Error ocurred', {
        variant: 'error',
      })
      console.error(error)
    }
  }

  const upload = async (url, file, tokenFields, headers = {}) => {
    const buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ''), 'base64')

    // const bodyString = {
    //   ...tokenFields,
    //   file: buf,
    // }
    // console.log('Dante: upload -> body', bodyString)
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      // body: buf,
    })

    const body = await response.json()

    if (!response.ok || !body) {
      throw new Error('Bullshit: unknow error')
    }

    return body
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
