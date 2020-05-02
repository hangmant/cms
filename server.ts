import express, { Request, Response } from 'express'
import next from 'next'
import nextI18next from './i18n'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

const nextI18NextMiddleware = require('next-i18next/middleware').default

;(async () => {
  try {
    await app.prepare()

    const server = express()

    await nextI18next.initPromise
    server.use(nextI18NextMiddleware(nextI18next))

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()

// import * as express from 'express'
// import next from 'next'

// const nextI18NextMiddleware = require('next-i18next/middleware').default

// const port = process.env.PORT || 3000
// const app = next({ dev: process.env.NODE_ENV !== 'production' })
// const handle = app.getRequestHandler()

// ;(async () => {
//   await app.prepare()
//   const server = express()

//   await nextI18next.initPromise
//   server.use(nextI18NextMiddleware(nextI18next))

//   server.get('*', (req, res) => handle(req, res))

//   await server.listen(port)
//   console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
// })()
