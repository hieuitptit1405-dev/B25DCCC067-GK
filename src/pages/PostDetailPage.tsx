import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiError, fetchCommentsByPostId, fetchPostById } from '../api/jsonplaceholder'
import { getLocalPostById, isLocalPostId } from '../api/localPosts'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'
import type { Comment, Post } from '../types'

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const loadPost = useCallback(async () => {
    if (!Number.isInteger(postId) || postId <= 0) {
      setError('Mã bài viết không hợp lệ.')
      setPost(null)
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      if (isLocalPostId(postId)) {
        const localPost = getLocalPostById(postId)
        if (!localPost) {
          throw new Error('Không tìm thấy bài viết này trên máy của bạn.')
        }
        setPost(localPost)
        setComments([])
      } else {
        const [remotePost, remoteComments] = await Promise.all([
          fetchPostById(postId),
          fetchCommentsByPostId(postId),
        ])
        setPost(remotePost)
        setComments(remoteComments)
      }
    } catch (err) {
      setPost(null)
      setComments([])
      if (err instanceof ApiError && err.status === 404) {
        setError('Không tìm thấy bài viết này. Có thể bài viết đã bị xóa hoặc đường dẫn sai.')
      } else {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [postId])
  useEffect(() => {
    void loadPost()
  }, [loadPost])
  if (isLoading) return <Spinner text="Đang tải bài viết..." />
  if (error) {
    return (
      <ErrorMessage message={error} onRetry={loadPost}>
        <Link to="/" className="btn btn-outline">
          Về trang chủ
        </Link>
      </ErrorMessage>
    )
  }
  if (!post) return null
  return (
    <article className="detail">
      <Link to="/" className="back-link">
        Về trang chủ
      </Link>
      {post.isLocal && <span className="badge">Bài viết của bạn</span>}
      <h1 className="detail-title">{post.title}</h1>
      <p className="detail-meta">Bài viết #{post.id}</p>
      <p className="detail-body">{post.body}</p>

      <section className="comments">
        <h2 className="comments-title">Bình luận ({comments.length})</h2>

        {post.isLocal && (
          <p className="empty">
            Bài viết này được lưu trên máy bạn nên chưa có bình luận từ máy chủ.
          </p>
        )}

        {!post.isLocal && comments.length === 0 && <p className="empty">Chưa có bình luận nào.</p>}

        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-name">{comment.name}</span>
                <span className="comment-email">{comment.email}</span>
              </div>
              <p className="comment-body">{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}