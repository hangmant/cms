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

export const UPDATE_WORD_MUTATION = gql`
  mutation updateWord($_id: ID!, $data: WordUpdateInput!) {
    updateWord(_id: $_id, data: $data) {
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

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
      _id
      name
      color
      description
    }
  }
`

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation updateCategory($_id: ID!, $data: CategoryUpdateInput!) {
    updateCategory(_id: $_id, data: $data) {
      _id
      name
      color
      description
    }
  }
`

export const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory($_id: ID!) {
    deleteCategory(_id: $_id) {
      _id
      name
      color
      description
    }
  }
`
