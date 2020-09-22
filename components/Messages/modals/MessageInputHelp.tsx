import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
} from '@material-ui/core'
import React, { useState } from 'react'

type MessageInputHelpModalProps = {
  children: Function
}

export const MessageInputHelpModal = ({ children }: MessageInputHelpModalProps) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <React.Fragment>
      <Dialog
        classes={{
          paper: classes.container,
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Markdown Help</DialogTitle>
        <Divider />
        <div className={classes.table}>
          <div className={classes.row}>
            <div>
              <b>Bold</b>
            </div>
            <div>
              <p>**bold**</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <i>Italics</i>
            </div>
            <div>
              <p>*italics*</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <del>Strikethrough</del>
            </div>
            <div>
              <p>~~strikethrough~~</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <p>Header</p>
            </div>
            <div>
              <p># H1 ## H2 ### H3</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <li>item</li>
            </div>
            <div>
              <p>* item</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <p>Blockquote</p>
            </div>
            <div>
              <p>{'>'} blockquote</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <p>@somebody (mention)</p>
            </div>
            <div>
              <p>@somebody</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <p>#123 (issue)</p>
            </div>
            <div>
              <p>#123</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <a
                style={{
                  color: '#2980b9',
                }}
              >
                Link
              </a>
            </div>
            <div>
              <p>[title](http://)</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <p>Image</p>
            </div>
            <div>
              <p>![alt](http://)</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <code className={classes.inlineCode}>code</code>
            </div>
            <div>
              <p>`code`</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <td>
                L<sup>a</sup>T<sub>e</sub>X
              </td>
            </div>
            <div>
              <p>$$LaTeX code$$</p>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <pre
                style={{
                  display: 'inline-block; margin: 4px 0',
                }}
                className={classes.precode}
              >
                <code>
                  <span className="keyword">var </span>code ={' '}
                  <span className="string">"formatted"</span>;
                </code>
              </pre>
            </div>
            <div>
              <td style={{ lineHeight: '100%' }}>
                <p>
                  ```
                  <i style={{ color: 'rgba(0,0,0,0.5)' }}>(shift+enter for line break)</i>
                  <br />
                  var code = "formatted";
                  <br />
                  ```
                </p>
              </td>
            </div>
          </div>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {children({ handleOpen })}
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: 400,
  },
  inlineCode: {
    overflowX: 'auto',
    padding: '0 4px !important',
    border: '1px solid rgba(192,201,200,.4)',
    backgroundColor: 'rgba(192,201,200,.2)',
    borderRadius: 2,
    fontSize: '.875em',
    wordWrap: 'break-word',
  },
  precode: {
    '& > code': {
      overflowX: 'auto',
      display: 'inline',
      padding: '.5em',
      color: '#f8f8f2',
      background: '#23241f',
      borderRadius: 6,
      border: 'none',
      lineHeight: '1.4em',
      wordWrap: 'normal',
    },
    '& .string': {
      color: '#e6db74',
    },
    '& .keyword': {
      color: '#fc8db5',
    },
  },
  table: {
    padding: 14,
    background: '#f2f0ed',
  },
  row: {
    borderBottom: '1px solid #eeeeee',
    '&:nth-child(even)': {
      background: '#2632381a',
    },
    '&:last-child': {
      borderBottom: 'red',
    },
    display: 'flex',
    padding: '6px 0',
    alignItems: 'center',
    '& *': {
      padding: 0,
      margin: 0,
    },
    '& p': {
      padding: 0,
    },
    '& div': {
      width: '50%',
    },
  },
  list: {
    marginTop: 14,
    maxHeight: 300,
    overflowY: 'scroll',
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  inputFile: {
    display: 'none',
  },
}))
