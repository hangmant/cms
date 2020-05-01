import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import CachedIcon from '@material-ui/icons/Cached'
import { Formik } from 'formik'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { HuePicker } from 'react-color'
import * as Yup from 'yup'
import { UPDATE_CATEGORY_MUTATION } from '../../../apollo/mutations'
import { GET_CATEGORIES, GET_CATEGORY } from '../../../apollo/queries'
import Phone from '../../../src/Phone'
import { useGlobalLoader } from '../../../hooks/useGlobalLoader'
import { withAuthentication } from '../../../src/Authenticate'

const NewWord = () => {
  const classes = useStyles()
  const router = useRouter()
  const { startLoading, finishLoading } = useGlobalLoader()

  const { categoryId } = router.query

  const { data, loading } = useQuery(GET_CATEGORY, {
    variables: {
      _id: categoryId,
    },
  })

  const [updateCategory, { loading: loadingUpdate }] = useMutation(UPDATE_CATEGORY_MUTATION, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
      },
    ],
    awaitRefetchQueries: true,
  })

  const category = get(data, 'category')

  const handleSubmit = async values => {
    startLoading()
    await updateCategory({
      variables: {
        _id: categoryId,
        data: {
          name: values.name,
          color: values.color,
          description: values.description,
        },
      },
    })
    finishLoading()
    router.replace('/categories')
  }

  if (loading) return <p>Loading...</p>
  return (
    <Formik
      initialValues={{
        name: category.name,
        color: category.color,
        description: category.description,
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(1, 'Text should have almost 1 character')
          .max(20, 'Name length should be less than 20')
          .required('Name is required'),
        description: Yup.string()
          .min(1, 'Text should have almost 1 character')
          .max(800, 'Description length should be less than 20'),
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
                <div className={classes.pickerField}>
                  <p className={classes.pickerFieldLabel}>Color</p>
                  <div style={{ paddingLeft: 10 }}>
                    <HuePicker
                      className={classes.colorPicker}
                      color={values.color}
                      onChange={handleChangeColor}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loadingUpdate}
                  className={classes.button}
                  startIcon={<CachedIcon />}
                >
                  Actualizar
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
  pickerField: {
    display: 'flex',
    margin: '10px 0',
    padding: '10px 6px',
    border: '1px  solid #c4c4c4',
    borderRadius: 4,
    flexDirection: 'column',
  },
  pickerFieldLabel: {
    color: '#757575',
    fontSize: 16,
    margin: '0 0 8px 0',
  },
}))

export default withAuthentication(NewWord)
