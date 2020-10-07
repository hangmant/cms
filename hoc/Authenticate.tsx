import React from 'react'
import { redirect } from '../apis/auth.utils'
import { getJwt, isAuthenticated } from '../apis/auth/auth'
import { Layout } from '../components/Layout'
import { User } from '../interfaces/user.interface'

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
      }
    }

    render() {
      return (
        <Layout user={(this.props as any).user}>
          <Child {...this.props} />
        </Layout>
      )
    }
  }

  return Wrapper
}
