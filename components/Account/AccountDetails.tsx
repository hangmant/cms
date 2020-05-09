import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core'
import { User } from '../../interfaces/user.interface'
import { Formik } from 'formik'
import ButtonLoader from '../ButtonLoader'

type AccountDetailsProps = {
  className?: any
  user: User
  loadingUpdateUser: boolean
  onUpdateUser: (user: any) => any
}

export const AccountDetails = (props: AccountDetailsProps) => {
  const { className, onUpdateUser, loadingUpdateUser, ...rest } = props

  const classes = useStyles()

  const user = {
    firstName: props.user.name || ' ',
    lastName: 'Zhi',
    email: ' ',
    phone: '',
    state: 'Alabama',
    country: 'USA',
    ...props.user,
  }
  console.log('Dante: AccountDetails -> user', user)

  const states = [
    {
      value: 'alabama',
      label: 'Alabama',
    },
    {
      value: 'new-york',
      label: 'New York',
    },
    {
      value: 'san-francisco',
      label: 'San Francisco',
    },
  ]

  const handleSubmit = values => {
    onUpdateUser({
      name: values.firstName,
    })
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
                      onChange={handleChange}
                      required
                      value={values.email}
                      variant="outlined"
                    />
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
                    <TextField
                      fullWidth
                      label="Select State"
                      name="state"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {states.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      onChange={handleChange}
                      required
                      value={values.country}
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
