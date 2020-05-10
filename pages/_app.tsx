import { ApolloProvider } from '@apollo/react-hooks'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
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
              if ([401].includes(status)) {
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
      .concat(
        new HttpLink({
          uri: 'http://localhost:8087/graphql',
        })
      ),
    cache: new InMemoryCache().restore(initialState || {}),
  })
})(MyApp)
