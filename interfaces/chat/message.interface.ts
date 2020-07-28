import { User } from '../user.interface'

export interface Message {
  _id: string
  text: string
  html: string
  fromUser: User
  roomId: string
}
