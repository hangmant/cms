import fetch from 'isomorphic-fetch'
import { config } from '../config'
import { statusCodeToStatusMessage } from '../../helpers/status-code-to-status-message.helper'

export const verifyEmail = async (token: string) => {
  try {
    const response = await fetch(`${config.hangmanApiREST}/email-verification/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    const body = await response.json()

    if (!body) {
      return {
        status: 'error',
        message: 'Inesperated error ocurred',
      }
    }

    return {
      status: statusCodeToStatusMessage(body.statusCode),
      message: body.message,
    }
  } catch {
    return {
      status: 'error',
      message: 'Inesperated error ocurred',
    }
  }
}
