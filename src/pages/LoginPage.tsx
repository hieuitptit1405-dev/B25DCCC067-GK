import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface LocationState {
  from?: string
}
export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.')
      return
    }
    if (!login(username, password)) {
      setError('Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.')
      return
    }
    const state = location.state as LocationState | null
    navigate(state?.from ?? '/', { replace: true })
  }
  return (
    <section className="form-page">
      <h1 className="page-title">Đăng nhập</h1>
      <p className="page-subtitle">
        Chỉ người đã đăng nhập mới có thể vào trang viết bài mới.
      </p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Tên đăng nhập
          </label>
          <input
            id="username"
            type="text"
            className="form-input"
            placeholder="admin"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="123456"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Đăng nhập
          </button>
          <Link to="/" className="btn btn-outline">
            Về trang chủ
          </Link>
        </div>
      </form>
      <p className="login-hint">
        Tài khoản dùng thử: <strong>admin</strong> / <strong>123456</strong>
      </p>
    </section>
  )
}