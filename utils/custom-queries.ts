import { buildQueries, Matcher, MatcherOptions, queryHelpers } from '@testing-library/react'

const queryAllByDataCy = (container?: HTMLElement, id?: Matcher, options?: MatcherOptions) =>
  queryHelpers.queryAllByAttribute('data-cy', container, id, options)

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
