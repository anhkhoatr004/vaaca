# VAACA - Quick Start Guide

## 🚀 Setup trong 3 phút

### Bước 1: Cài đặt Dependencies

```bash
cd vaaca-react
npm install
```

**Chờ khoảng 1-2 phút để npm cài đặt tất cả packages.**

### Bước 2: Chạy Development Server

```bash
npm run dev
```

**Output mong đợi:**
```
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Bước 3: Mở trình duyệt

Truy cập: **http://localhost:3000**

✅ **Done!** Website đã chạy thành công.

---

## 📝 Checklist sau khi setup

### 1. Kiểm tra các tính năng cơ bản:

- [ ] Header hiển thị đúng (logo + navigation)
- [ ] Hero section với background parallax
- [ ] Client logos grid
- [ ] Capabilities cards (3 cards)
- [ ] Industries tabs (có thể switch giữa 3 tabs)
- [ ] Supply Chain section với counter animation
- [ ] Footer đầy đủ thông tin

### 2. Test Responsive:

- [ ] Desktop (> 1024px) - Layout 2 cột
- [ ] Tablet (768px - 1024px) - Layout responsive
- [ ] Mobile (< 768px) - Mobile menu hoạt động

### 3. Test Ngôn ngữ:

- [ ] Click nút "EN" ở header → Chuyển sang "VN"
- [ ] Tất cả text trên page thay đổi sang tiếng Việt
- [ ] Click "VN" → Quay lại "EN"

---

## 🎨 Cập nhật nội dung

### Thay đổi text/hình ảnh:

**File: `src/data/database.js`**

```javascript
// Ví dụ: Thay đổi tiêu đề Hero
export const db = {
  hero: {
    titleLine1: "Sản xuất Chính xác &",  // ← Đổi text ở đây
    titleLine2: "Chuỗi Cung ứng",
    // ...
  }
}
```

**Sau khi sửa:**
- Lưu file (Ctrl+S / Cmd+S)
- Trình duyệt tự động reload (Hot Module Replacement)
- Không cần restart server

---

## 🔧 Các lệnh thường dùng

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code style |

---

## ⚠️ Xử lý lỗi thường gặp

### Lỗi: "Cannot find module"
**Giải pháp:**
```bash
rm -rf node_modules
npm install
```

### Lỗi: "Port 3000 is already in use"
**Giải pháp:**
- Đóng ứng dụng đang chạy ở port 3000
- Hoặc sửa file `vite.config.js`:
```javascript
server: {
  port: 3001,  // Đổi sang port khác
}
```

### Lỗi: Tailwind styles không hiển thị
**Giải pháp:**
```bash
# Xóa cache
rm -rf .vite
npm run dev
```

---

## 📚 Tài liệu tham khảo

- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **i18next**: https://www.i18next.com/
- **Framer Motion**: https://www.framer.com/motion/

---

## 🆘 Cần trợ giúp?

1. Kiểm tra file `README.md` để biết chi tiết
2. Xem thư mục `/docs` (coming soon)
3. Liên hệ team dev

---

**Happy Coding! 🚀**
