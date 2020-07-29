require('dotenv').config()

const withImages = require('next-images')

const config = withImages()

config.publicRuntimeConfig = {
  HANGWOMAN_API_REST: process.env.HANGWOMAN_API_REST,
  HANGWOMAN_API_WS: process.env.HANGWOMAN_API_WS,
  HANGWOMAN_API_GQL: process.env.HANGWOMAN_API_GQL,
}

module.exports = config
