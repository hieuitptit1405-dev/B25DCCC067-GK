# MiniBlog – Bài kiểm tra giữa kỳ (React + TypeScript)
README.md này là em dùng AI viết để cho người đọc dễ tiếp cận,dọc hiểu code của em hơn
Ứng dụng blog nhỏ xây dựng bằng **React + TypeScript (Vite)**, lấy dữ liệu từ
`https://jsonplaceholder.typicode.com` thông qua `fetch`.

## Cách chạy

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # kiểm tra TypeScript + build production
npm run preview  # xem bản build
```

## Chức năng đã làm

| # | Yêu cầu | Nơi cài đặt |
|---|---------|-------------|
| 1 | Trang chủ hiển thị danh sách bài viết, tìm kiếm theo tiêu đề | `src/pages/HomePage.tsx`, `src/hooks/usePosts.ts` |
| 2 | Xem chi tiết bài viết kèm danh sách bình luận | `src/pages/PostDetailPage.tsx` |
| 3 | Trạng thái đang tải + thông báo lỗi (có nút "Thử lại") | `src/components/Spinner.tsx`, `src/components/ErrorMessage.tsx` |
| 4 | Đăng nhập / đăng xuất (admin / 123456), chặn trang viết bài | `src/context/AuthContext.tsx`, `src/components/ProtectedRoute.tsx` |
| 5 | Form viết bài có kiểm tra dữ liệu, lưu localStorage và hiện trong danh sách | `src/pages/CreatePostPage.tsx`, `src/api/localPosts.ts` |
| 6 | Trang 404 cho đường dẫn không tồn tại | `src/pages/NotFoundPage.tsx` |

## Cấu trúc thư mục

```
src/
├── api/
│   ├── jsonplaceholder.ts   # fetch bài viết, bình luận + xử lý lỗi
│   └── localPosts.ts        # đọc/ghi bài viết mới trong localStorage
├── components/
│   ├── ErrorMessage.tsx     # thông báo lỗi + nút thử lại
│   ├── Layout.tsx           # navbar + nội dung + footer
│   ├── Navbar.tsx           # điều hướng, hiển thị trạng thái đăng nhập
│   ├── PostCard.tsx         # một thẻ bài viết
│   ├── ProtectedRoute.tsx   # chặn route khi chưa đăng nhập
│   └── Spinner.tsx          # trạng thái đang tải
├── context/AuthContext.tsx  # quản lý đăng nhập (lưu trong localStorage)
├── hooks/usePosts.ts        # tải + lọc danh sách bài viết
├── pages/                   # HomePage, PostDetailPage, CreatePostPage, LoginPage, NotFoundPage
├── types/index.ts           # Post, Comment, NewPostInput, FormErrors
├── App.tsx                  # khai báo routes
├── index.css                # toàn bộ style
└── main.tsx                 # điểm khởi động + BrowserRouter
```

## Ghi chú

- Tài khoản dùng thử: **admin / 123456**. Trạng thái đăng nhập được lưu ở
  `localStorage` (`miniblog_user`) nên không mất khi tải lại trang.
- Bài viết mới được lưu ở `localStorage` (`miniblog_posts`) với id bắt đầu từ
  **1000** để không trùng id 1..100 của API. Bài viết này được hiển thị ở đầu
  trang chủ kèm nhãn "Bài viết của bạn".
- Nếu API lỗi (mất mạng), trang chủ vẫn hiển thị bài viết lưu trên máy và kèm
  thông báo lỗi + nút "Thử lại".
- Kiểm tra dữ liệu form: tiêu đề ≥ 5 ký tự, nội dung ≥ 20 ký tự.
- Muốn xóa dữ liệu thử nghiệm: mở DevTools → Application → Local Storage và xóa
  key `miniblog_posts` (bài viết) hoặc `miniblog_user` (đăng nhập).