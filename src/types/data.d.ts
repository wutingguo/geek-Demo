export type LoginType = {
  mobile: string
  code: string
}
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}
// 用户频道channels
export type Channels = {
  id: number
  name: string
}
