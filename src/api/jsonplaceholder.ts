import type { Comment, Post } from '../types'
const BASE_URL = 'https://jsonplaceholder.typicode.com'
export class ApiError extends Error {
  readonly status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
async function request<T>(url: string): Promise<T> {
  let response: Response
  try {
    response = await fetch(url)
  } catch {
    throw new ApiError('Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng của bạn.', 0)
  }
  if (!response.ok) {
    const message =
      response.status === 404
        ? 'Không tìm thấy dữ liệu bạn yêu cầu (404).'
        : `Không thể tải dữ liệu (mã lỗi ${response.status}).`
    throw new ApiError(message, response.status)
  }
  return (await response.json()) as T
}
export function fetchPosts(): Promise<Post[]> {
  return request<Post[]>(`${BASE_URL}/posts`)
}
export function fetchPostById(id: number): Promise<Post> {
  return request<Post>(`${BASE_URL}/posts/${id}`)
}
export function fetchCommentsByPostId(postId: number): Promise<Comment[]> {
  return request<Comment[]>(`${BASE_URL}/posts/${postId}/comments`)
}