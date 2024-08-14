export interface Wishlist {
  id: number
  recently_viewed?: boolean
  when?: Date
  name: string
  list: List[]
}

export interface List {
  id: string
  medium_url: string
}
