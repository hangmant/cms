import { ApolloProvider } from '@apollo/react-hooks'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { window } from 'browser-monads'
import withApollo from 'next-with-apollo'
import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { NextProgress } from '../components/shared/NextProgress'
import { defaultTheme } from '../themes/default'
import { getJwt } from '../api/auth/auth'
import { getCookie } from '../api/session'

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
          </ThemeProvider>
        </React.Fragment>
      </ApolloProvider>
    )
  }
}

export default withApollo(
  ({
    /* initialState */
    ctx = {},
  }) => {
    const token = getCookie('jwt', ctx.req)
    return new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            })
          }
          if (networkError) {
            console.log(`[Network error]: ${networkError}`)
          }
        }),
        new HttpLink({
          uri: 'http://localhost:8087/graphql',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]),
      cache: new InMemoryCache(),
    })
  }
)(MyApp)
