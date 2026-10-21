import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import PostCard from '../components/PostCard'
import Spinner from '../components/Spinner'
import { usePosts } from '../hooks/usePosts'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { posts, totalCount, isLoading, error, reload } = usePosts(searchTerm)
  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">Danh sách bài viết</h1>
          <p className="page-subtitle">
            Dữ liệu lấy từ jsonplaceholder.typicode.com
            {totalCount > 0 && ` – ${totalCount} bài viết`}
          </p>
        </div>
        <input
          type="search"
          className="search-input"
          placeholder="Tìm kiếm theo tiêu đề..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {isLoading && <Spinner text="Đang tải danh sách bài viết..." />}
      {!isLoading && error && (
        <ErrorMessage message={error} onRetry={reload}>
          <span className="alert-hint">
            Một số bài viết lưu trên máy vẫn được hiển thị bên dưới.
          </span>
        </ErrorMessage>
      )}
      {!isLoading && posts.length === 0 && (
        <p className="empty">
          {searchTerm.trim()
            ? `Không tìm thấy bài viết nào có tiêu đề chứa "${searchTerm.trim()}".`
            : 'Chưa có bài viết nào.'}
        </p>
      )}
      {!isLoading && posts.length > 0 && (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}