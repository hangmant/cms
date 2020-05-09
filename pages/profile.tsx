import { useMutation, useQuery } from '@apollo/react-hooks'
import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { ME } from '../apollo/queries'
import { AccountDetails } from '../components/Account/AccountDetails'
import { AccountProfile } from '../components/Account/AccountProfile'
import { withAuthentication } from '../hoc/Authenticate'
import { User } from '../interfaces/user.interface'
import { UPDATE_ME_MUTATION } from '../apollo/mutations'

const Profile = props => {
  const { data } = useQuery(ME)
  const [updateMeMutation] = useMutation(UPDATE_ME_MUTATION)
  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)

  const user: User = data?.me ?? {}

  const handleUpdateMe = async user => {
    try {
      setLoadingUpdateUser(true)
      await updateMeMutation({
        variables: {
          data: user,
        },
      })
    } catch {
      console.error('Launch notify')
    } finally {
      setLoadingUpdateUser(false)
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <AccountProfile user={user} />
      </Grid>
      <Grid item lg={8} md={6} xl={8} xs={12}>
        <AccountDetails
          loadingUpdateUser={loadingUpdateUser}
          onUpdateUser={handleUpdateMe}
          user={user}
        />
      </Grid>
    </Grid>
  )
}

export default withAuthentication(Profile)
