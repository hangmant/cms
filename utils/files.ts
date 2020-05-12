export function fileSizeIsBetween(bytes: number, from: number, to: number): boolean {
  const kB = bytes / 1024
  return kB >= from && kB < to
}
