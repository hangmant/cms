import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import CreateIcon from '@material-ui/icons/Add'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Formik } from 'formik'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import * as Yup from 'yup'
import { CREATE_WORD_MUTATION, CREATE_CATEGORY_MUTATION } from '../../apollo/mutations'
import { GET_CATEGORIES, GET_WORDS } from '../../apollo/queries'
import { useGlobalLoader } from '../../hooks/useGlobalLoader'
import { HuePicker } from 'react-color'
import Phone from '../../src/Phone'

const NewWord = () => {
  const classes = useStyles()

  const router = useRouter()
  const { startLoading, finishLoading } = useGlobalLoader()
  const [createWord, { loading: loadingCreateNew }] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [
      {
        query: GET_WORDS,
      },
    ],
    awaitRefetchQueries: true,
  })

  const handleSubmit = async values => {
    console.log('Dante: values', values)
    // startLoading()
    // await createWord({
    //   variables: {
    //     data: {
    //       name: values.name,
    //       categoryId: values.categoryId,
    //     },
    //   },
    // })
    // finishLoading()
    // router.replace('/words')
  }

  return (
    <Formik
      initialValues={{
        name: '',
        color: '#4caf50',
        description: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(1, 'Text should have almost 1 character')
          .max(20, 'Name length should be less than 20')
          .required('Name is required'),
        description: Yup.string()
          .min(1, 'Text should have almost 1 character')
          .max(20, 'Name length should be less than 20'),
      })}
    >
      {props => {
        const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = props

        const handleChangeColor = color => setFieldValue('color', color.hex)

        return (
          <div className={classes.container}>
            <div
              style={{
                maxWidth: '400px',
              }}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  className={classes.field}
                  value={values.name}
                  helperText={errors.name}
                  error={Boolean(errors.name)}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  className={classes.field}
                  value={values.description}
                  helperText={errors.description}
                  error={Boolean(errors.description)}
                  onChange={handleChange}
                  name="description"
                  label="Description"
                  variant="outlined"
                />
                <HuePicker
                  className={classes.colorPicker}
                  color={values.color}
                  onChange={handleChangeColor}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loadingCreateNew}
                  className={classes.button}
                  startIcon={<CreateIcon />}
                >
                  Create
                </Button>
              </form>
            </div>
            <Phone statusBarColor={values.color}>
              <div
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingLeft: 10,
                  display: 'flex',
                  color: 'white',
                  justifyContent: 'center',
                  fontSize: 18,
                  backgroundColor: values.color,
                  fontWeight: 'bold',
                  height: 60,
                }}
              >
                {values.name}
              </div>
            </Phone>
          </div>
        )
      }}
    </Formik>
  )
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  field: {
    margin: '10px 0',
  },
  colorPicker: {
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
  },
}))

export default NewWord
