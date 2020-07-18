type StatusMessage = 'sucess' | 'error' | 'warning'

export function statusCodeToStatusMessage(statusCode: number): StatusMessage {
  switch (statusCode) {
    case 200:
    case 201:
      return 'sucess'
    case 409:
      return 'warning'
    default:
      return 'error'
  }
}
