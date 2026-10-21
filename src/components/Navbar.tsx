import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  function handleLogout() {
    logout()
    navigate('/')
  }
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          MiniBlog
        </Link>
        <nav className="navbar-links">
          <NavLink to="/" className="navbar-link" end>
            Trang chủ
          </NavLink>
          <NavLink to="/create" className="navbar-link">
            Viết bài mới
          </NavLink>
        </nav>
        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">Xin chào, {user}</span>
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}