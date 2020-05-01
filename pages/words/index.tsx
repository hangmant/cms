import { useMutation, useQuery } from '@apollo/react-hooks'
import { Chip, IconButton } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import AddIcon from '@material-ui/icons/Add'
import DelteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { get } from 'lodash'
import Link from 'next/link'
import React from 'react'
import { DELETE_WORD_MUTATION } from '../../apollo/mutations'
import { GET_WORDS } from '../../apollo/queries'
import { useGlobalLoader } from '../../hooks/useGlobalLoader'
import { withAuthentication } from '../../components/Authenticate'

const columns = [
  { id: 'name', key: 'name', label: 'Name', minWidth: 170 },
  { id: 'category', key: 'category.name', label: 'Category', minWidth: 100 },
  { id: 'options', key: 'name', label: 'Options', minWidth: 100 },
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    maxHeight: 800,
  },
}))

function Words() {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(100)
  const { startLoading, finishLoading } = useGlobalLoader()

  const { data } = useQuery(GET_WORDS, {
    pollInterval: 3000,
  })
  const [deleteWord] = useMutation(DELETE_WORD_MUTATION, {
    refetchQueries: ['words'],
  })
  const words = get(data, 'words', [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  const handleDeleteWord = _id => async () => {
    try {
      startLoading()
      await deleteWord({
        variables: {
          _id,
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      finishLoading()
    }
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {words
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((word, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell key={`name${index}`}>{get(word, 'name')}</TableCell>
                    <TableCell key={`category-${index}`}>
                      <Chip
                        color="primary"
                        label={get(word, 'category.name')}
                        style={{
                          backgroundColor: word.category.color,
                        }}
                      />
                    </TableCell>
                    <TableCell key={`options${index}`}>
                      <div>
                        <Link href={`/words/edit/${word._id}`}>
                          <IconButton>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Link>
                        <IconButton
                          style={{
                            color: '#f44336',
                          }}
                          onClick={handleDeleteWord(word._id)}
                        >
                          <DelteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={words.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Fab aria-label={'fab.label'} className={classes.fab} color={'primary'}>
        <Link href={`/words/new`}>
          <AddIcon />
        </Link>
      </Fab>
    </Paper>
  )
}

export default withAuthentication(Words)
