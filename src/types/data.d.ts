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

// 文章列表
export type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
}
// 搜索建议列表
export type Suggestion = string[]
// 搜索历史列表数据
export type HistoryType = string[]
