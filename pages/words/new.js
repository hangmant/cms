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
    await createWord({
      variables: {
        data: {
          name: values.name,
          categoryId: values.category._id,
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
          category: null,
        }}
        onSubmit={handleSubmit}
        // validationSchema={Yup.object().shape({
        //   email: Yup.string()
        //     .email()
        //     .required('Required'),
        // })}
      >
        {props => {
          const { values, handleChange, handleSubmit, setFieldValue } = props

          const handleChangeCategory = (_, value) => setFieldValue('category', value)

          return (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                value={values.name}
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
