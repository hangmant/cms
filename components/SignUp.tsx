import { Button, Divider, TextField, Typography } from '@material-ui/core'
import { window } from 'browser-monads'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Separator from './shared/Separator'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER_MUTATION } from '../apollo/mutations'
import { useSnackbar } from 'notistack'

type LoginProps = {
  handleToggleForm: () => any
}

export const SignUp = ({ handleToggleForm }: LoginProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const redirectToLogin = () => {
    window.location.replace('/login')
  }

  const [createUser] = useMutation(CREATE_USER_MUTATION)

  const handleSubmit = async values => {
    try {
      await createUser({
        variables: {
          data: values,
        },
      })
      redirectToLogin()
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      })
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      // validationSchema={Yup.object().shape({
      //   name: Yup.string()
      //     .min(1, 'Text should have almost 1 character')
      //     .max(20, 'Name length should be less than 20')
      //     .required('Name is required'),
      // })}
    >
      {props => {
        const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = props
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="First Name"
              fullWidth
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            <Separator v={12} />
            <TextField
              variant="outlined"
              label="Last Name"
              fullWidth
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            <Separator v={12} />
            <TextField
              variant="outlined"
              type="email"
              label="Email Address"
              fullWidth
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            <Separator v={12} />
            <TextField
              variant="outlined"
              label="Password"
              fullWidth
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <Separator v={12} />
            <Typography>
              By clicking the <b>Create account</b> button below you agree to our terms of service
              and privacy statement.
            </Typography>
            <Separator v={12} />
            <Button size="large" fullWidth type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
            <Separator v={12} />
            <Divider />
            <Separator v={6} />
            <Button
              size="small"
              onClick={handleToggleForm}
              color="primary"
              fullWidth
              variant="text"
            >
              You have an account? Sign In
            </Button>
          </form>
        )
      }}
    </Formik>
  )
}
