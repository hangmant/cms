import Slugify from 'seo-friendly-slugify'

const s = new Slugify()

export function fileSizeIsBetween(bytes: number, from: number, to: number): boolean {
  const kB = bytes / 1024
  return kB >= from && kB < to
}

export const generateFileName = (userId: string, ext = '.png') => {
  return `avatars/${userId}/${s.slugify(new Date().toISOString())}${ext}`
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
