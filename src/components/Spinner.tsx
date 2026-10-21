interface SpinnerProps {
  text?: string
}
export default function Spinner({ text = 'Đang tải dữ liệu...' }: SpinnerProps) {
  return (
    <div className="spinner-box" role="status" aria-live="polite">
      <span className="spinner" />
      <p className="spinner-text">{text}</p>
    </div>
  )
}