import gql from 'graphql-tag'

export const GET_WORDS = gql`
  query words {
    words {
      _id
      name
      category {
        _id
        name
        description
      }
    }
  }
`

export const GET_WORD = gql`
  query word($_id: ID!) {
    word(_id: $_id) {
      _id
      name
      category {
        _id
        name
        description
      }
    }
  }
`

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      _id
      name
      description
    }
  }
`
