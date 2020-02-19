import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import withApollo from 'next-with-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

import Layout from '../src/Layout'
class MyApp extends App {
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
          <Head>
            <title>Hangman CMS</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </React.Fragment>
      </ApolloProvider>
    )
  }
}

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: 'http://localhost:8087/graphql',
    cache: new InMemoryCache().restore(initialState || {}),
  })
})(MyApp)
