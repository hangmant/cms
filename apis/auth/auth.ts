import fetch from 'isomorphic-fetch'
import { User } from '../../interfaces/user.interface'
import { config } from '../../config/config'
import { getCookie } from '../session'

export const isAuthenticated = async (token: string): Promise<User> => {
  const response = await fetch(`${config.hangwomanApiREST}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const body: User = await response.json()

  if (!response.ok || !body) {
    return null
  }

  return body
}

export const getJwt = ctx => {
  return getCookie('jwt', ctx.req)
}
