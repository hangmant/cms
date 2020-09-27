import gql from 'graphql-tag'

export const MESSAGE_SUBSCRIPTION = gql`
  subscription($roomId: String!) {
    messageCreated(roomId: $roomId) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`

export const TYPING_INDICATOR_CHANGED_SUBSCRIPTION = gql`
  subscription($roomId: ID!) {
    typingIndicatorChanged(roomId: $roomId) {
      user {
        _id
        name
      }
      isTyping
    }
  }
`
