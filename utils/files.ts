export function fileSizeIsBetween(bytes: number, from: number, to: number): boolean {
  const kB = bytes / 1024
  return kB >= from && kB < to
}

export const generateFileName = (file: File) => {
  let getDate = new Date()
  let timestamp = getDate.toISOString()
  timestamp = timestamp.replace(/:/g, '-')
  timestamp = timestamp.replace(/\./g, '-')

  return timestamp + file.name.replace(/ /g, '_')
}

export const dataURLToFile = (
  dataURL: string,
  filename: string,
  mimeType: string
): Promise<File> => {
  mimeType = mimeType || (dataURL.match(/^data:([^;]+);/) || '')[1]
  return fetch(dataURL)
    .then(res => res.arrayBuffer())
    .then(buffer => new File([buffer], filename, { type: mimeType }))
}
