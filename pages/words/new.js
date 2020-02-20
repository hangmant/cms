import React from 'react'
import CreateIcon from '@material-ui/icons/Add'
import { makeStyles, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { CREATE_WORD_MUTATION } from '../../apollo/mutations'
import { GET_CATEGORIES } from '../../apollo/queries'
import { get } from 'lodash'

const NewWord = () => {
  const classes = useStyles()

  const { data, loading } = useQuery(GET_CATEGORIES)
  const [createWord] = useMutation(CREATE_WORD_MUTATION)

  const categories = get(data, 'categories', [])

  const handleSubmit = async values => {
    console.log('Dante: NewWord -> values', values)
    await createWord({
      variables: {
        data: {
          name: values.name,
          categoryId: values.categoryId,
        },
      },
    })
  }

  return (
    <div
      style={{
        maxWidth: '400px',
      }}
    >
      <Formik
        initialValues={{
          name: '',
          categoryId: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(1, 'Text should have almost 1 character')
            .max(20, 'Name length should be less than 20')
            .required('Name is required'),
          categoryId: Yup.string('Category is required')
            .length(24, 'Invalid Category')
            .required('Category is required'),
        })}
      >
        {props => {
          const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = props
          console.log('Dante: NewWord -> values', values)

          const handleChangeCategory = (_, value) =>
            setFieldValue('categoryId', value ? value._id : null)

          return (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                value={values.name}
                helperText={errors.name}
                error={Boolean(errors.name)}
                onChange={handleChange}
                name="name"
                label="Name"
                variant="outlined"
              />
              <Autocomplete
                style={{ width: '100%', margin: '20px 0' }}
                id="category"
                onChange={handleChangeCategory}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={option => option.name}
                options={categories}
                loading={loading}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Category"
                    fullWidth
                    helperText={errors.categoryId}
                    error={Boolean(errors.categoryId)}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CreateIcon />}
              >
                Create
              </Button>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export default NewWord
