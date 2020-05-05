import { Button, Card, Divider, TextField } from '@material-ui/core'
import { window } from 'browser-monads'
import fetch from 'isomorphic-fetch'
import React, { useState } from 'react'
import styled from 'styled-components'
import { setCookie } from '../api/session'
import { ResLoginLocal } from '../interfaces/res-login-local.interface'
import Separator from './shared/Separator'

export const Login = () => {
  const [username, setUsername] = useState<string>('calderon@gmail.com')
  const [password, setPassword] = useState<string>('mailero')

  const redirectToDashboard = () => {
    window.location.replace('/words')
  }

  const onClickLogIn = async () => {
    try {
      const response = await fetch(`http://localhost:8087/api/auth/login/jwt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const body: ResLoginLocal = await response.json()

      if (!response.ok || !body.token) {
        throw new Error('You are not authenticated')
      }

      setCookie('jwt', body.token)

      redirectToDashboard()
    } catch (error) {
      console.error('Error on login', error)
    }
  }

  return (
    <AllContainer>
      <Container>
        <TextField
          variant="outlined"
          label="Email Address"
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Separator v={12} />
        <TextField
          variant="outlined"
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Separator v={12} />
        <Button size="large" fullWidth onClick={onClickLogIn} variant="contained" color="primary">
          Login
        </Button>
        <Separator v={12} />
        <Divider light />
        <Separator v={6} />
        <Button size="small" color="primary" fullWidth variant="text">
          Don't have an account? Sign Up
        </Button>
      </Container>
    </AllContainer>
  )
}

const Container = styled(Card)`
  max-width: 400px;
  width: 100%;
  padding: 30px 30px;
`

const AllContainer = styled.div`
  display: flex;
  background-image: url('https://images.unsplash.com/photo-1548780977-74a1f9089b9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2091&q=80');
  justify-content: center;
  padding: 10px;
  align-items: center;
  height: 100vh;
`
