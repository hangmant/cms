import React, { createContext, useContext } from 'react'
import { redirect } from '../apis/auth.utils'
import { getJwt, isAuthenticated } from '../apis/auth/auth'
import Layout from '../components/Layout'
import { User } from '../interfaces/user.interface'

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
          <Layout user={(this.props as any).user}>
            <Child {...this.props} user={(this.props as any).user} />
          </Layout>
        </AuthContext.Provider>
      )
    }
  }

  return Wrapper
}

export const useAuth = () => useContext(AuthContext)
