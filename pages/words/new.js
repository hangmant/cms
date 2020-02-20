import React from 'react'
import CreateIcon from '@material-ui/icons/Add'
import { makeStyles, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { CREATE_WORD_MUTATION } from '../../apollo/mutations'

const NewWord = () => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  const [createWord] = useMutation(CREATE_WORD_MUTATION)

  React.useEffect(() => {
    if (!loading) {
      return undefined
    }

    return () => {
      active = false
    }
  }, [loading])

  const handleSubmit = async values => {
    await createWord({
      variables: {
        data: {
          name: values.name,
          categoryId: '5e4e1539eb20af58904c0a3a',
        },
      },
    })
    console.log('Dante: handleSubmit -> values', values)
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
          categoryId: '',
        }}
        onSubmit={handleSubmit}
        // validationSchema={Yup.object().shape({
        //   email: Yup.string()
        //     .email()
        //     .required('Required'),
        // })}
      >
        {props => {
          const { values, handleChange, handleSubmit } = props

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
                id="asynchronous-demo"
                style={{ width: '100%', margin: '20px 0' }}
                open={open}
                onOpen={() => {
                  setOpen(true)
                }}
                onClose={() => {
                  setOpen(false)
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={option => option.name}
                options={options}
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
                // onClick={() => handleSubmit()}
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
