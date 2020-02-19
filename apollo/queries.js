import gql from 'graphql-tag'

export const GET_WORDS = gql`
  query words {
    words {
      name
    }
  }
`
