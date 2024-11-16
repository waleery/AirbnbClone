export interface Review {
  comment: string
  user: ReviewProfile
  date: Date
}

interface ReviewProfile {
  name: string
  profileImage: string
}
