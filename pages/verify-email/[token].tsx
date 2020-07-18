import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { verifyEmail } from '../../apis/verify-email/verify-email'
import clsx from 'clsx'

function VerifyEmail({ result }) {
  const classes = useStyles()

  const error = result.status
  return (
    <div className={classes.containerBox}>
      {
        <p
          className={clsx(
            error === 'sucess' && classes.correctMessage,
            error === 'error' && classes.errorMessage,
            error === 'warning' && classes.warningMessage
          )}
        >
          {result.message}
        </p>
      }
    </div>
  )
}

VerifyEmail.getInitialProps = async ctx => {
  const { token } = ctx.query

  const result = await verifyEmail(token)

  return {
    result: result,
  }
}

const useStyles = makeStyles(theme => ({
  containerBox: {
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: 40,
    boxShadow: '1px 1px solid gray',
  },
  correctMessage: {
    color: 'green',
  },
  errorMessage: {
    color: 'red',
  },
  warningMessage: {
    color: 'orange',
  },
}))

export default VerifyEmail
