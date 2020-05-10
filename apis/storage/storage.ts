import fetch from 'isomorphic-fetch'
import { config } from '../config'
import { getCookie } from '../session'
import { FileUploadInfo } from '../types/file-upload-info.type'

export const generateStorageToken = async (
  fileUploadInfo: FileUploadInfo,
  token: string
): Promise<any> => {
  const response = await fetch(`${config.hangmanApiREST}/storage/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fileUploadInfo),
  })

  const body = await response.json()

  if (!response.ok || !body) {
    throw new Error('Bullshit: unknow error')
  }

  return body
}

export const getJwt = ctx => {
  return getCookie('jwt', ctx.req)
}
