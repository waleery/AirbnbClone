export interface Review {
  comment: string
  user: ReviewProfile
}

interface ReviewProfile {
  name: string
  date: Date
  profileImage: string
}
