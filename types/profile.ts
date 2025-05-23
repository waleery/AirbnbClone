import { Review } from './review'

export interface Profile {
  guest: boolean
  verified: boolean
  yearsOnAirbnb: number
  city: string
  country: string
  confirmedInformation: confirmedInformation
  reviews?: Review[]
}

export interface confirmedInformation {
  identity: boolean
  emailAddress: boolean
  phoneNumber: boolean
}
