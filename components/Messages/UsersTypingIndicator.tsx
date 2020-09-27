import React from 'react'
import { UserTyping } from '../../interfaces/chat/user-typing.interface'
import { parseUsersTyping } from '../../helpers/parse-users-typing.helper'

type UsersTypingIndicatorTypes = {
  myUserId: string
  users: UserTyping[]
}

export const UsersTypingIndicator = React.memo(
  ({ myUserId, users }: UsersTypingIndicatorTypes) => {
    const html = parseUsersTyping(users.filter(({ _id }) => _id !== myUserId))
    return (
      <div>
        <p dangerouslySetInnerHTML={{ __html: html }}></p>
      </div>
    )
  }
)
