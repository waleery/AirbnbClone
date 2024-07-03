export interface Conversation {
  conversation_id: number
  last_message_time: Date
  accomodation_id: number
  accomodation_date: string
  messages: Message[]
  hosts: Hosts[]
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
