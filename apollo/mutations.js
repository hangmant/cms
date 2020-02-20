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
