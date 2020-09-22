import { IconButton, makeStyles, TextField, ClickAwayListener } from '@material-ui/core'
import IconHelp from '@material-ui/icons/HelpOutline'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import { Picker } from 'emoji-mart'
import PopupState, { bindPopover, bindTrigger, bindPopper } from 'material-ui-popup-state'
import Popper from '@material-ui/core/Popper'
import React, { useState, useRef } from 'react'
import { MessageInputHelpModal } from './modals/MessageInputHelp'
import Fade from '@material-ui/core/Fade'

type MessageInputProps = {
  handleSendText: (text: string) => void
}

export const MessageInput = ({ handleSendText }: MessageInputProps) => {
  const classes = useStyles()
  const inputRef = useRef(null)
  const [text, setText] = useState('')

  const handleChangeText = event => {
    setText(event.target.value)
  }

  const handleKeyPress = async event => {
    if (event.keyCode === 13) {
      if (event.ctrlKey) {
        setText(prevText => prevText + '\n')
        return
      }

      event.preventDefault()
      const textito = text
      await handleSendText(textito)
      setText('')
    }
  }

  const handleSelectEmoji = emoji => {
    setText(prevText => prevText + emoji.native)
    setTimeout(() => {
      inputRef.current?.focus()
      const length = inputRef.current?.value?.length
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(length, length)
    }, 20)
  }

  return (
    <div className={classes.container}>
      <TextField
        placeholder="Click here to type a chat message. Supports GitHub flavoured markdown."
        value={text}
        rowsMax={5}
        autoFocus
        inputRef={inputRef}
        onKeyDown={handleKeyPress}
        onChange={handleChangeText}
        fullWidth
        multiline
        id="outlined-basic"
        variant="outlined"
      />

      <div className={classes.helps}>
        <MessageInputHelpModal>
          {({ handleOpen }) => (
            <IconButton title="Help" onClick={handleOpen} aria-label="delete" size="small">
              <IconHelp fontSize="inherit" />
            </IconButton>
          )}
        </MessageInputHelpModal>
        <PopupState variant="popper" popupId="popup-emojis">
          {popupState => (
            <div>
              <IconButton
                title="Help"
                aria-label="open-emojis"
                size="small"
                {...bindTrigger(popupState)}
              >
                <SentimentSatisfiedIcon fontSize="inherit" />
              </IconButton>
              <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={() => {
                  setTimeout(popupState.close, 100)
                }}
              >
                <Popper {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={100}>
                      <Picker
                        onSelect={handleSelectEmoji}
                        showPreview={false}
                        showSkinTones={false}
                      />
                    </Fade>
                  )}
                </Popper>
              </ClickAwayListener>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  helps: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))
