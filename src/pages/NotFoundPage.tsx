import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="not-found-code">404</p>
      <h1 className="page-title">Không tìm thấy trang</h1>
      <p className="page-subtitle">
        Đường dẫn bạn truy cập không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link to="/" className="btn btn-primary">
        ← Về trang chủ
      </Link>
    </section>
  )
}