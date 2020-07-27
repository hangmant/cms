import gql from 'graphql-tag'

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      _id
      text
      html
      fromUser
      roomId
    }
  }
`
