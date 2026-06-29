import { apiClient } from './client'

export type GoogleReview = {
  author: string
  rating: number
  text: string
  date?: string | null
  publish_time?: string | null
  author_url?: string | null
  photo_url?: string | null
}

export const listGoogleReviews = async () => {
  const response = await apiClient.get<GoogleReview[]>('/reviews/google')
  return response.data
}
