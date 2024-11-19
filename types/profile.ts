import { Review } from './review'

export interface Profile {
  guest: boolean
  verified: boolean
  yearsOnAirbnb: number
  city: string
  country: string
  confirmedIndormation: confirmedIndormation
  reviews?: Review[]
}

export interface confirmedIndormation {
  identity: boolean
  emailAddress: boolean
  phoneNumber: boolean
}
