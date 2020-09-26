import { Button, Card, Divider, TextField } from '@material-ui/core'
import { window } from 'browser-monads'
import fetch from 'isomorphic-fetch'
import React, { useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import { setCookie } from '../apis/session'
import { config } from '../config/config'
import { ResLoginLocal } from '../interfaces/res-login-local.interface'
import Separator from './shared/Separator'
import { useFormik } from 'formik'

type LoginProps = {
  handleToggleForm: () => any
}

export const Login = (props: LoginProps) => {
  const redirectToDashboard = () => {
    window.location.replace('/words')
  }

  const onClickLogIn = async ({ email, password }) => {
    try {
      const response = await fetch(`${config.hangwomanApiREST}/auth/login/jwt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
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

  const formik = useFormik({
    initialValues: {
      email: 'dante@gmail.com',
      password: 'dante',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Required!'),
      password: Yup.string().required('Required!'),
    }),
    onSubmit: onClickLogIn,
  })
  console.log('Dante: formik', formik.errors)

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          label="Email Address"
          helperText={formik.errors.email}
          error={Boolean(formik.errors.email)}
          name="email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Separator v={12} />
        <TextField
          variant="outlined"
          helperText={formik.errors.password}
          error={Boolean(formik.errors.password)}
          label="Password"
          name="password"
          fullWidth
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Separator v={12} />
        <Button size="large" fullWidth type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Separator v={12} />
      <Divider />
      <Separator v={6} />
      <Button
        size="small"
        color="primary"
        onClick={props.handleToggleForm}
        fullWidth
        variant="text"
      >
        Don't have an account? Sign Up
      </Button>
    </React.Fragment>
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
