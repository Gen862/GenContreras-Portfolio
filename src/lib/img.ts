export function publicPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export function img(file: string) {
  return publicPath(`img/${file}`)
}
