import { Country } from './country.interface'

export interface User {
  _id: string
  username: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  country?: Country
  isEmailVerified?: boolean
  avatar?: string
  email: string
}
