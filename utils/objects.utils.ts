import omit from 'omit-deep-lodash'
import { updatedDiff } from 'deep-object-diff'

export function sanitizeMutation(value: object, extraValues: string[] = []) {
  return omit(value, extraValues.concat('__typename'))
}

export function deepDiffValues(newValues: object, initialValues: object = {}) {
  if (!initialValues || Object.keys(initialValues).length === 0) {
    return sanitizeMutation(newValues, ['_id', 'isEmailVerified'])
  }
  return updatedDiff(initialValues, sanitizeMutation(newValues))
}
