import { useMutation } from '@apollo/react-hooks'
import { Button, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import CreateIcon from '@material-ui/icons/Add'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { HuePicker } from 'react-color'
import * as Yup from 'yup'
import { CREATE_CATEGORY_MUTATION } from '../../apollo/mutations'
import { GET_CATEGORIES } from '../../apollo/queries'
import { useGlobalLoader } from '../../hooks/useGlobalLoader'
import Phone from '../../components/Phone'
import { withAuthentication } from '../../hoc/Authenticate'

const NewWord = () => {
  const classes = useStyles()

  const router = useRouter()
  const { startLoading, finishLoading } = useGlobalLoader()
  const [createCategory, { loading: loadingCreate }] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
      },
    ],
    awaitRefetchQueries: true,
  })

  const handleSubmit = async values => {
    try {
      startLoading()
      await createCategory({
        variables: {
          data: {
            name: values.name,
            color: values.color,
            description: values.description,
          },
        },
      })

      router.replace('/categories')
    } catch (error) {
      console.error(error)
    } finally {
      finishLoading()
    }
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
                  disabled={loadingCreate}
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
