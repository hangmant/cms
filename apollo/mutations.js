import gql from 'graphql-tag'

export const CREATE_WORD_MUTATION = gql`
  mutation createWord($data: WordCreateInput!) {
    createWord(data: $data) {
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

export const DELETE_WORD_MUTATION = gql`
  mutation deleteWord($_id: ID!) {
    deleteWord(_id: $_id) {
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
