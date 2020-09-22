import { IconButton, makeStyles, TextField } from '@material-ui/core'
import Popover from '@material-ui/core/Popover'
import IconHelp from '@material-ui/icons/HelpOutline'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import { Picker } from 'emoji-mart'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import React, { useState } from 'react'
import { MessageInputHelpModal } from './modals/MessageInputHelp'

type MessageInputProps = {
  handleSendText: (text: string) => void
}

export const MessageInput = ({ handleSendText }: MessageInputProps) => {
  const classes = useStyles()
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
  }

  return (
    <>
      <div className={classes.container}>
        <TextField
          placeholder="Click here to type a chat message. Supports GitHub flavoured markdown."
          value={text}
          rowsMax={5}
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
              <>
                <IconButton title="Help" onClick={handleOpen} aria-label="delete" size="small">
                  <IconHelp fontSize="inherit" />
                </IconButton>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {popupState => (
                    <div>
                      <IconButton
                        title="Help"
                        onClick={handleOpen}
                        aria-label="delete"
                        size="small"
                        {...bindTrigger(popupState)}
                      >
                        <SentimentSatisfiedIcon fontSize="inherit" />
                      </IconButton>

                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <Picker
                          onSelect={handleSelectEmoji}
                          showPreview={false}
                          showSkinTones={false}
                          // style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                        />
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </>
            )}
          </MessageInputHelpModal>
        </div>
      </div>
    </>
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
