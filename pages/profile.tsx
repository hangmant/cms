import { Grid } from '@material-ui/core'
import React from 'react'
import { AccountDetails } from '../components/Account/AccountDetails'
import { AccountProfile } from '../components/Account/AccountProfile'
import { withAuthentication } from '../hoc/Authenticate'

const Profile = () => {
  return (
    <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <AccountProfile />
      </Grid>
      <Grid item lg={8} md={6} xl={8} xs={12}>
        <AccountDetails />
      </Grid>
    </Grid>
  )
}

export default withAuthentication(Profile)
