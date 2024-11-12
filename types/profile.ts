export interface Profile {
  guest: boolean
  verified: boolean
  revievs: number
  yearsOnAirbnb: number
  city: string
  country: string
  confirmedIndormation: confirmedIndormation
}

interface confirmedIndormation {
  identity: boolean
  emailAddress: boolean
  phoneNumber: boolean
}
