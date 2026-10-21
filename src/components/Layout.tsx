import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
export default function Layout() {
  return (
    <div className="app">
      <Navbar />
      <main className="container main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">MiniBlog – bài kiểm tra giữa kỳ (React + TypeScript)</div>
      </footer>
    </div>
  )
}