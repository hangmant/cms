import React from 'react'
import { Login } from '../components/Login'
import { getJwt } from '../api/auth/auth'
import { redirect } from '../api/auth.utils'

const LoginPage = () => {
  return <Login />
}

LoginPage.getInitialProps = async context => {
  const token = getJwt(context)
  // const authenticatedUser: User = await isAuthenticated(token)

  if (token) {
    redirect(context, '/words')
    return {}
  }

  return {}
}

export default LoginPage
