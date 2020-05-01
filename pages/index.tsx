import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { ButtonLink } from '../components/ButtonLink'
import ProTip from '../components/ProTip'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Button variant="contained" color="secondary" component={ButtonLink} href="/words">
          Get Started
        </Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}
