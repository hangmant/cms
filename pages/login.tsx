import React from 'react'
import { Login } from '../components/Login'
import { getJwt } from '../apis/auth/auth'
import { redirect } from '../apis/auth.utils'

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
