import type { NewPostInput, Post } from '../types'
const STORAGE_KEY = 'miniblog_posts'
export const FIRST_LOCAL_ID = 1000
export function getLocalPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Post[]) : []
  } catch {
    return []
  }
}
export function saveLocalPost(input: NewPostInput): Post {
  const posts = getLocalPosts()
  const nextId = posts.reduce((maxId, post) => Math.max(maxId, post.id), FIRST_LOCAL_ID - 1) + 1
  const newPost: Post = {
    id: nextId,
    userId: 1,
    title: input.title.trim(),
    body: input.body.trim(),
    isLocal: true,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newPost, ...posts]))
  return newPost
}
export function getLocalPostById(id: number): Post | undefined {
  return getLocalPosts().find((post) => post.id === id)
}
export function isLocalPostId(id: number): boolean {
  return id >= FIRST_LOCAL_ID
}