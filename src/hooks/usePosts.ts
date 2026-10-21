import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchPosts } from '../api/jsonplaceholder'
import { getLocalPosts } from '../api/localPosts'
import type { Post } from '../types'

interface UsePostsResult {
  posts: Post[]
  totalCount: number
  isLoading: boolean
  error: string | null
  reload: () => void
}
export function usePosts(searchTerm: string): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const loadPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const remotePosts = await fetchPosts()
      setPosts([...getLocalPosts(), ...remotePosts])
    } catch (err) {
      setPosts(getLocalPosts())
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.')
    } finally {
      setIsLoading(false)
    }
  }, [])
  useEffect(() => {
    void loadPosts()
  }, [loadPosts])
  const keyword = searchTerm.trim().toLowerCase()
  const filteredPosts = useMemo(
    () =>
      keyword ? posts.filter((post) => post.title.toLowerCase().includes(keyword)) : posts,
    [posts, keyword],
  )
  return { posts: filteredPosts, totalCount: posts.length, isLoading, error, reload: loadPosts }
}