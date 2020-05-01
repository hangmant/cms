import React, { useState } from 'react'
import { ResLoginLocal } from './interfaces/res-login-local.interface'
import { TextField, Box, Card } from '@material-ui/core'
import styled from 'styled-components'

export const Login = () => {
  const [username, setUsername] = useState<string>('calderon@gmail.com')
  const [password, setPassword] = useState<string>('mailero')

  const onClickLogIn = async () => {
    try {
      const response: ResLoginLocal = await fetch(`http://localhost:8087/api/auth/login/jwt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then(res => res.json())

      if (response) {
        localStorage.setItem('token', response.token)
      } else {
        throw new Error('Response is empty')
      }
      console.log('Dante: onClickLogIn -> response', response)
    } catch (error) {
      console.error('Error on login', error)
    }
  }

  return (
    <div>
      <Card>
        <TextField value={username} onChange={e => setUsername(e.target.value)} />
        <TextField value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={onClickLogIn}>Login</button>
      </Card>
    </div>
  )
}

const Container = styled(Card)`
  background: red;
`
