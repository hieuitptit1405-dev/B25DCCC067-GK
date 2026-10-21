export interface Post {
  id: number
  userId: number
  title: string
  body: string
  /** true nếu bài viết được tạo trong ứng dụng và lưu ở localStorage */
  isLocal?: boolean
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface NewPostInput {
  title: string
  body: string
}

export type FormErrors = Partial<Record<keyof NewPostInput, string>>