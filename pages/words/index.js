import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { get } from 'lodash'
import { IconButton } from '@material-ui/core'
import DelteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import NextLink from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { useQuery } from '@apollo/react-hooks'
import { GET_WORDS } from '../../apollo/queries'

const columns = [
  { id: 'name', key: 'name', label: 'Name', minWidth: 170 },
  { id: 'category', key: 'category.name', label: 'Category', minWidth: 100 },
  { id: 'options', key: 'name', label: 'Options', minWidth: 100 },
]

const rows = [
  {
    _id: '1',
    name: 'PERU',
    category: {
      _id: '1',
      name: 'Geografia',
    },
  },
  {
    _id: '2',
    name: 'Ceviche',
    category: {
      _id: '2',
      name: 'Comida',
    },
  },
  {
    _id: '3',
    name: 'Maria',
    category: {
      _id: '45',
      name: 'Personas',
    },
  },
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
    maxHeight: 440,
  },
}))

export default function Words() {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(100)

  const { data } = useQuery(GET_WORDS)
  const words = get(data, 'words', [])
  console.log('Dante: Words -> words', words)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDeleteWord = id => () => {}

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
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
                    <TableCell key={`category-${index}`}>{get(word, 'category.name')}</TableCell>
                    <TableCell key={`options${index}`}>
                      <div>
                        <NextLink href={`/words/edit/${word._id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </NextLink>
                        <IconButton onClick={handleDeleteWord(word._id)}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <Fab aria-label={'fab.label'} className={classes.fab} color={'primary'}>
        <NextLink href={`/words/new`}>
          <AddIcon />
        </NextLink>
      </Fab>
    </Paper>
  )
}
