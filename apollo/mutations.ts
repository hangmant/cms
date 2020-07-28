import gql from 'graphql-tag'

export const CREATE_WORD_MUTATION = gql`
  mutation createWord($data: WordCreateInput!) {
    createWord(data: $data) {
      _id
      name
      category {
        _id
        name
        color
        description
        __typename
      }
      __typename
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
        color
        description
        __typename
      }
      __typename
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
        color
        description
        __typename
      }
      __typename
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
      __typename
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
      __typename
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
      __typename
    }
  }
`

export const UPDATE_ME_MUTATION = gql`
  mutation updateMe($data: UserUpdateInput!) {
    updateMe(data: $data) {
      _id
      username
      firstName
      lastName
      phone
      address
      country {
        name
        flag
        alpha2Code
      }
      email
      avatar
      __typename
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      _id
      username
      firstName
      lastName
      phone
      address
      country {
        name
        flag
        alpha2Code
      }
      email
      avatar
      __typename
    }
  }
`

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($data: EmailVerifyInput!) {
    verifyEmail(data: $data) {
      message
    }
  }
`

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($data: MessageCreateInput!) {
    createMessage(data: $data) {
      _id
      text
      html
      fromUser {
        _id
        firstName
        lastName
        avatar
        email
        __typename
      }
      roomId
      __typename
    }
  }
`
