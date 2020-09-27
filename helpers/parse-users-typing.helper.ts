import { UserTyping } from '../interfaces/chat/user-typing.interface'

export function parseUsersTyping(users: UserTyping[]) {
  if (users.length === 0) return ''

  const usersNames = users.map(user => user.name)

  if (usersNames.length === 1) {
    return `<b>${usersNames[0]}</b> is typing...`
  }

  const firstUsers = usersNames.slice(0, usersNames.length - 1)
  const [lastUser] = usersNames.slice(usersNames.length - 1)

  return (
    firstUsers.map(user => `<b>${user}</b>`).join(', ') + ` and <b>${lastUser}</b> are typing...`
  )
}
