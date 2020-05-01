import { window } from 'browser-monads'
import Router, { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Layout from './Layout'

type AuthUserInfo = boolean

const AuthContext = createContext<AuthUserInfo>(undefined)

export function withAuthentication(Component: React.ElementType) {
  return function Wrapper(props: any) {
    const { pathname } = useRouter()
    const [user, setUser] = useState<AuthUserInfo>()
    console.log('Dante: Wrapper -> user', user)

    const isAuthenticated = async () => {
      const token = window.localStorage.getItem('token')
      if (token) {
        setUser(true)
      } else {
        setUser(null)
      }
    }

    useEffect(() => {
      isAuthenticated()
    }, [pathname])

    useEffect(() => {
      if (pathname !== '/login' && user === null) {
        Router.replace('/login')
      }
    }, [user])

    return (
      <AuthContext.Provider value={user}>
        <Layout>{user ? <Component {...props} user={user} /> : null}</Layout>
      </AuthContext.Provider>
    )
  }
}

export const useAuth = () => useContext(AuthContext)
