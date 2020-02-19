import React from 'react'
import CreateIcon from '@material-ui/icons/Add'
import { makeStyles, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

const NewWord = () => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    if (!loading) {
      return undefined
    }

    return () => {
      active = false
    }
  }, [loading])

  return (
    <div
      style={{
        maxWidth: '400px',
      }}
    >
      <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" />
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
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CreateIcon />}
      >
        Create
      </Button>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export default NewWord
