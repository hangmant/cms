import { ApolloProvider } from '@apollo/react-hooks'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import get from 'lodash/get'
import withApollo from 'next-with-apollo'
import App from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { redirect } from '../apis/auth.utils'
import { getCookie } from '../apis/session'
import { NextProgress } from '../components/shared/NextProgress'
import { defaultTheme } from '../themes/default'
import { HttpStatus } from '../enums/http-status.enum'
import { config } from '../config/config'

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <React.Fragment>
          <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider autoHideDuration={4000} maxSnack={3}>
              <NextProgress
                color="#f89402"
                options={{ trickleSpeed: 50 }}
                height="3"
                showAfterMs={200}
                spinner
              />
              <CssBaseline />
              <Head>
                <title>Hangman CMS</title>
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width"
                />
              </Head>
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </React.Fragment>
      </ApolloProvider>
    )
  }
}

/** get updated token in every request */
const authLink = setContext(({ context = {} }, { headers }) => {
  const token = getCookie('jwt', context.req)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024

const httpLink = new HttpLink({
  uri: config.hangwomanApiGQL,
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: config.hangwomanApiWS,
      options: {
        reconnect: true,
        connectionParams: {
          authorization: `Bearer ${getCookie('jwt')}`,
        },
      },
    })
  : null

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)

        return (
          definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink
    )
  : httpLink

export default withApollo(({ initialState, ctx = {} }) => {
  return new ApolloClient({
    link: authLink
      .concat(
        onError(({ graphQLErrors, networkError, response }) => {
          if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            })

            /** redirect  */
            if (process.browser) {
              const status = get(response, 'errors[0].extensions.exception.status')
              if (status === HttpStatus.UNAUTHORIZED) {
                console.error('Redirecting to login')
                redirect(ctx, '/login')
              }
            }
          }
          if (networkError) {
            console.log(`[Network error]: ${networkError}`)
          }
        })
      )
      .concat(link),
    cache: new InMemoryCache().restore(initialState || {}),
  })
})(MyApp)
