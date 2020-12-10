import getConfig from 'next/config'

const { publicRuntimeConfig: env } = getConfig()

export const config = {
  hangwomanApiREST: env.HANGWOMAN_API_REST || 'http://localhost:8087/api',
  hangwomanApiWS: env.HANGWOMAN_API_WS || 'ws://localhost:8087/graphql',
  hangwomanApiGQL: env.HANGWOMAN_API_GQL || 'http://localhost:8087/graphql',
  hangwomanCloudfrontURL: env.HANGWOMAN_CLOUDFRONT_URL
}
