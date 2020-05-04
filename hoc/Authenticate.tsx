import { window } from 'browser-monads'
import Router, { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { User } from '../interfaces/user.interface'
import { isAuthenticated, getJwt } from '../api/auth/auth'
import { redirect } from '../api/auth.utils'

type AuthUserInfo = boolean

const AuthContext = createContext<AuthUserInfo>(undefined)

export function withAuthentication(Child: React.ElementRef<any>) {
  class Wrapper extends React.Component {
    static async getInitialProps(context) {
      let ChildProps = {}

      if (Child.getInitialProps) {
        ChildProps = await Child.getInitialProps(context)
      }

      const token = getJwt(context)
      const authenticatedUser: User = await isAuthenticated(token)
      if (!authenticatedUser) {
        redirect(context, '/login')
      }

      return {
        ...ChildProps,
        user: authenticatedUser,
        isAuthenticated: Boolean(authenticatedUser),
      }
    }

    render() {
      return (
        <AuthContext.Provider value={(this.props as any).user}>
          <Layout>
            <Child {...this.props} user={(this.props as any).user} />
          </Layout>
        </AuthContext.Provider>
      )
    }
  }

  return Wrapper
}

export const useAuth = () => useContext(AuthContext)
