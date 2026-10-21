import { Link } from 'react-router-dom'
import type { Post } from '../types'
interface PostCardProps {
  post: Post
}
export default function PostCard({ post }: PostCardProps) {
  const preview = post.body.length > 110 ? `${post.body.slice(0, 110)}...` : post.body

  return (
    <article className="post-card">
      {post.isLocal && <span className="badge">Bài viết của bạn</span>}
      <Link to={`/posts/${post.id}`} className="post-card-title">
        {post.title}
      </Link>
      <p className="post-card-body">{preview}</p>
      <Link to={`/posts/${post.id}`} className="post-card-link">
        Xem chi tiết →
      </Link>
    </article>
  )
}