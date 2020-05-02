import { createMuiTheme } from '@material-ui/core'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import overrides from './overrides'
import palette from './palette'
import typography from './typography'

export const defaultTheme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
} as ThemeOptions)
