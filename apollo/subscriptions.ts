import gql from 'graphql-tag'

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
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
