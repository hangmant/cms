import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useGetCountries } from '../../apollo/hooks/useGetCountries.hook'
import { Country } from '../../interfaces/country.interface'
import { User } from '../../interfaces/user.interface'
import { countryCodeToFlag } from '../../utils/emojis.utils'
import { sanitizeMutation } from '../../utils/objects.utils'
import ButtonLoader from '../ButtonLoader'

type AccountDetailsProps = {
  className?: any
  user: User
  loadingUpdateUser: boolean
  onUpdateUser: (user: any) => any
}

export const AccountDetails = (props: AccountDetailsProps) => {
  const { className, onUpdateUser, loadingUpdateUser, ...rest } = props

  const [isEmailVerificationSeded, setIsEmailVerificationSended] = useState(false)

  const classes = useStyles()
  const { countries, loading } = useGetCountries()

  const user: User = {
    username: ' ',
    firstName: ' ',
    lastName: ' ',
    address: ' ',
    country: {
      name: ' ',
      alpha2Code: ' ',
    },
    email: ' ',
    phone: ' ',
    isEmailVerified: true,
    ...props.user,
  }

  const handleSubmit = values => {
    onUpdateUser(sanitizeMutation(values, ['_id', 'isEmailVerified']))
  }

  return (
    <Formik enableReinitialize initialValues={user} onSubmit={handleSubmit}>
      {props => {
        const { values, handleChange, handleSubmit, setFieldValue, errors } = props
        return (
          <Card {...rest} className={clsx(classes.root, className)}>
            <form onSubmit={handleSubmit}>
              <CardHeader subheader="The information can be edited" title="Profile" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify the first name"
                      label="First name"
                      name="firstName"
                      onChange={handleChange}
                      required
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={handleChange}
                      required
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      disabled
                      onChange={handleChange}
                      value={values.email}
                      variant="outlined"
                    />
                    {!user.isEmailVerified && (
                      <p style={{ color: 'red' }}>
                        Your email isn't verified, {/* TODO: Send email verification again */}
                        <a href="https://google.colm">send email verification again</a>
                      </p>
                    )}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      type="number"
                      value={values.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      id="country-select-demo"
                      options={countries}
                      autoHighlight
                      value={values.country}
                      onChange={(_, value) => {
                        setFieldValue('country', value)
                      }}
                      loading={loading}
                      getOptionLabel={(country: Country) => country.name}
                      renderOption={(country: Country) => (
                        <React.Fragment>
                          <span>{countryCodeToFlag(country.alpha2Code)}</span>
                          {country.name} ({country.alpha2Code}) {/* +{country.alpha2Code} */}
                        </React.Fragment>
                      )}
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Country"
                          name="country"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password',
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <ButtonLoader
                  loading={loadingUpdateUser}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Save details
                </ButtonLoader>
              </CardActions>
            </form>
          </Card>
        )
      }}
    </Formik>
  )
}

const useStyles = makeStyles(() => ({
  root: {},
}))
