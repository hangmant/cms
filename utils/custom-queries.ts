import { queryHelpers, buildQueries } from '@testing-library/react'

const queryAllByDataCy = (...args) => queryHelpers.queryAllByAttribute('data-cy', ...args)

const getMultipleError = (c, dataCyValue) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`
const getMissingError = (c, dataCyValue) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`

const [queryByDataCy, getAllByDataCy, getByDataCy, findAllByDataCy, findByDataCy] = buildQueries(
  queryAllByDataCy,
  getMultipleError,
  getMissingError
)

export {
  queryByDataCy,
  queryAllByDataCy,
  getByDataCy,
  getAllByDataCy,
  findAllByDataCy,
  findByDataCy,
}
