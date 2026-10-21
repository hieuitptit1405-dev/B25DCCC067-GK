import type { ReactNode } from 'react'
interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  children?: ReactNode
}
export default function ErrorMessage({ message, onRetry, children }: ErrorMessageProps) {
  return (
    <div className="alert" role="alert">
      <p className="alert-title">Đã xảy ra lỗi</p>
      <p className="alert-message">{message}</p>
      <div className="alert-actions">
        {onRetry && (
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            Thử lại
          </button>
        )}
        {children}
      </div>
    </div>
  )
}