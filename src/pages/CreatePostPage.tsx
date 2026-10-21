import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { saveLocalPost } from '../api/localPosts'
import type { FormErrors, NewPostInput } from '../types'

const EMPTY_FORM: NewPostInput = { title: '', body: '' }
function validateForm(values: NewPostInput): FormErrors {
  const errors: FormErrors = {}
  const title = values.title.trim()
  const body = values.body.trim()
  if (!title) {
    errors.title = 'Vui lòng nhập tiêu đề bài viết.'
  } else if (title.length < 5) {
    errors.title = 'Tiêu đề phải có ít nhất 5 ký tự.'
  }
  if (!body) {
    errors.body = 'Vui lòng nhập nội dung bài viết.'
  } else if (body.length < 20) {
    errors.body = 'Nội dung phải có ít nhất 20 ký tự.'
  }
  return errors
}
export default function CreatePostPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState<NewPostInput>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  function handleChange(field: keyof NewPostInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formErrors = validateForm(values)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return
    const newPost = saveLocalPost(values)
    setValues(EMPTY_FORM)
    navigate(`/posts/${newPost.id}`, { replace: true })
  }
  return (
    <section className="form-page">
      <Link to="/" className="back-link">
        ← Về trang chủ
      </Link>
      <h1 className="page-title">Viết bài mới</h1>
      <p className="page-subtitle">
        Bài viết sẽ được lưu trong localStorage của trình duyệt và hiển thị ở đầu trang chủ.
      </p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Tiêu đề
          </label>
          <input
            id="title"
            type="text"
            className={`form-input${errors.title ? ' form-input-error' : ''}`}
            placeholder="Ví dụ: Kinh nghiệm học React của tôi"
            value={values.title}
            onChange={(event) => handleChange('title', event.target.value)}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="body">
            Nội dung
          </label>
          <textarea
            id="body"
            rows={8}
            className={`form-input${errors.body ? ' form-input-error' : ''}`}
            placeholder="Nhập nội dung bài viết (ít nhất 20 ký tự)..."
            value={values.body}
            onChange={(event) => handleChange('body', event.target.value)}
          />
          {errors.body && <p className="form-error">{errors.body}</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Lưu bài viết
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setValues(EMPTY_FORM)
              setErrors({})
            }}
          >
            Xóa form
          </button>
        </div>
      </form>
    </section>
  )
}