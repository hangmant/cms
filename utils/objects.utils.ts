import omit from 'omit-deep-lodash'

export function sanitizeMutation(value: object, extraValues: string[] = []) {
  return omit(value, extraValues.concat('__typename'))
}
