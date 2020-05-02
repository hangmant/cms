import { ThemeProvider } from '@material-ui/core/styles'
import { render, RenderOptions, queries, RenderResult } from '@testing-library/react'
import React from 'react'
import { defaultTheme } from '../themes/default.theme'
import * as customQueries from './custom-queries'

type AllTheProvidersProps = {
  children: React.ReactChild
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}

const customRender = (ui: React.ReactElement, options: RenderOptions = {}): RenderResult =>
  render(ui, {
    wrapper: AllTheProviders,
    queries: {
      ...queries,
      ...customQueries,
    },
    ...options,
  })

export * from '@testing-library/react'

export { customRender as render }
