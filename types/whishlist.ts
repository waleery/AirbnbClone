export interface Wishlist {
    recently_viewed?: boolean
    when?: Date
    name: string
    list: List[]
  }
  
  export interface List {
    id: string
  }
  
  