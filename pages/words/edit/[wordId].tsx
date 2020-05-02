import { useMutation, useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import CachedIcon from '@material-ui/icons/Cached'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Formik } from 'formik'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import * as Yup from 'yup'
import { UPDATE_WORD_MUTATION } from '../../../apollo/mutations'
import { GET_CATEGORIES, GET_WORD, GET_WORDS } from '../../../apollo/queries'
import ButtonLoader from '../../../components/ButtonLoader'
import { withAuthentication } from '../../../hoc/Authenticate'

const NewWord = () => {
  const classes = useStyles()

  const router = useRouter()

  const { wordId } = router.query

  const { data, loading } = useQuery(GET_WORD, {
    variables: {
      _id: wordId,
    },
  })
  console.log('Dante: NewWord -> data', data)

  const { data: categoriesData, loading: loadingCategories } = useQuery(GET_CATEGORIES)

  const [updateWord, { loading: loadingUpdateWord }] = useMutation(UPDATE_WORD_MUTATION, {
    refetchQueries: [
      {
        query: GET_WORDS,
      },
    ],
    awaitRefetchQueries: true,
  })

  const categories = get(categoriesData, 'categories', [])
  const word = get(data, 'word')

  const handleSubmit = async values => {
    await updateWord({
      variables: {
        _id: wordId,
        data: {
          name: values.name,
        },
      },
    })
    router.replace('/words')
  }

  if (loading) return <p>Loading...</p>
  return (
    <div
      style={{
        maxWidth: '400px',
      }}
    >
      <Formik
        initialValues={{
          name: word.name,
          category: word.category,
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(1, 'Text should have almost 1 character')
            .max(20, 'Name length should be less than 20')
            .required('Name is required'),
        })}
      >
        {props => {
          const { values, handleChange, handleSubmit, setFieldValue, errors } = props

          const handleChangeCategory = (_, value) =>
            setFieldValue('category', value ? value : null)

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
                getOptionSelected={(option, value) => option._id === value._id}
                getOptionLabel={option => option.name}
                disabled // Don't change category on update
                value={values.category}
                options={categories}
                loading={loadingCategories}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Category"
                    fullWidth
                    helperText={errors.category}
                    error={Boolean(errors.category)}
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

              <ButtonLoader
                type="submit"
                variant="contained"
                color="primary"
                loading={loadingUpdateWord}
                className={classes.button}
                startIcon={<CachedIcon />}
              >
                UPDATE
              </ButtonLoader>
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

export default withAuthentication(NewWord)
