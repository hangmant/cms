import { ClickAwayListener, IconButton, makeStyles, TextField } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import Popper from '@material-ui/core/Popper'
import IconHelp from '@material-ui/icons/HelpOutline'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import { Picker } from 'emoji-mart'
import PopupState, { bindPopper, bindTrigger } from 'material-ui-popup-state'
import React, { useEffect, useRef, useState } from 'react'
import { MessageInputHelpModal } from './modals/MessageInputHelp'

type MessageInputProps = {
  handleSendText: (text: string) => void
  handleStartTyping: () => void
  handleStopTyping: () => void
}

const TypingIndicatorDelay = 1200

export const MessageInput = ({
  handleStartTyping,
  handleStopTyping,
  handleSendText,
}: MessageInputProps) => {
  const classes = useStyles()
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)
  const [text, setText] = useState('')

  const handleChangeText = event => {
    setText(event.target.value)
  }

  const setTyping = () => {
    if (!timeoutRef.current) {
      handleStartTyping()
    } else {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      handleStopTyping()
      timeoutRef.current = null
    }, TypingIndicatorDelay)
  }

  const handleForceStopTyping = () => {
    handleStopTyping()
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }

  useEffect(() => {
    return () => {
      // TODO: Fix, not working on reload page
      if (timeoutRef.current) {
        handleForceStopTyping()
      }
    }
  }, [])

  const handleKeyPress = async event => {
    if (event.keyCode === 13) {
      if (event.ctrlKey) {
        setText(prevText => prevText + '\n')
        return
      }
      event.preventDefault()
      const textito = text
      handleForceStopTyping()
      await handleSendText(textito)
      setText('')
      return
    }
    setTyping()
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
