import { useMutation, useQuery } from '@apollo/react-hooks'
import { IconButton } from '@material-ui/core'
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
import { DELETE_CATEGORY_MUTATION } from '../../apollo/mutations'
import { GET_CATEGORIES } from '../../apollo/queries'
import { withAuthentication } from '../../hoc/Authenticate'

type ColumnType = {
  id?: string
  key?: string
  label?: string
  minWidth?: number
  style?: any
}

const columns: ColumnType[] = [
  { id: 'color', key: 'color', label: 'Color', minWidth: 50, style: { width: 72 } },
  {
    id: 'name',
    key: 'name',
    label: 'Name',
    minWidth: 170,
  },
  {
    id: 'description',
    key: 'description',
    label: 'Description',
    minWidth: 170,
  },
  { id: 'options', key: 'name', label: 'Actions', minWidth: 100 },
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  color: {
    width: 40,
    borderRadius: '50%',
    height: 40,
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

  const { data } = useQuery(GET_CATEGORIES, {
    pollInterval: 3000,
  })
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    refetchQueries: ['categories'],
    awaitRefetchQueries: true,
  })
  const categories = get(data, 'categories', [])

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  const handleDeleteWord = _id => async () => {
    try {
      await deleteCategory({
        variables: {
          _id,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  style={{
                    ...(column.style ? column.style : {}),
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell key={`color${index}`}>
                      <div
                        className={classes.color}
                        style={{ backgroundColor: get(category, 'color') }}
                      ></div>
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} key={`name${index}`}>
                      {get(category, 'name')}
                    </TableCell>
                    <TableCell key={`description${index}`}>
                      {get(category, 'description')}
                    </TableCell>
                    <TableCell key={`options${index}`}>
                      <div>
                        <Link href={`/categories/edit/${category._id}`}>
                          <IconButton>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Link>
                        <IconButton
                          style={{
                            color: '#f44336',
                          }}
                          onClick={handleDeleteWord(category._id)}
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
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Fab aria-label={'fab.label'} className={classes.fab} color={'primary'}>
        <Link href={`/categories/new`}>
          <AddIcon />
        </Link>
      </Fab>
    </Paper>
  )
}

export default withAuthentication(Words)
