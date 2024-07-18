export interface Conversation {
  conversation_id: number
  last_message_time: Date
  messages: Message[]
  accomodation_id?: number
  accomodation_date?: string
  hosts?: Hosts[]
  customer_service?: boolean
  favourite: boolean
}

export interface Message {
  timestamp: Date
  user_id: number
  message: string
  id: number
}

interface Hosts {
  name: string
  image: string
}
