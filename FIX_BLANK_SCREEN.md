# ⚡ FIX NHANH - Màn hình trắng

## 🔴 Vấn đề: localhost:3000 hiển thị trang trắng

### ✅ GIẢI PHÁP 1: Reset & Reinstall (90% hiệu quả)

**Mở Terminal và chạy:**

```bash
cd vaaca-react

# Xóa cache và cài lại
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

**Chờ 1-2 phút → Refresh browser**

---

### ✅ GIẢI PHÁP 2: Kiểm tra Console (Nếu vẫn blank)

**Trong Chrome/Firefox:**
1. Nhấn `F12`
2. Click tab **Console**
3. Xem có lỗi màu đỏ không?

**Screenshot lỗi và gửi cho tôi nếu có**

---

### ✅ GIẢI PHÁP 3: Test với App đơn giản

**Thay file `src/main.jsx` bằng code này:**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function TestApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>✅ VAACA Working!</h1>
        <p style={{ color: '#94a3b8', fontSize: '20px' }}>
          React đã chạy thành công
        </p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)
```

**Save → Refresh browser**

**Nếu thấy "VAACA Working!":**
- ✅ React OK
- ❌ Lỗi ở components gốc
- → Restore từng component một để tìm lỗi

**Nếu vẫn blank:**
- → Chuyển sang Giải pháp 4

---

### ✅ GIẢI PHÁP 4: Kiểm tra Node version

```bash
node -v
```

**Cần: v18.0.0 trở lên**

**Nếu thấp hơn:**
- Download Node.js mới: https://nodejs.org/
- Cài đặt
- Chạy lại `npm install`

---

### ✅ GIẢI PHÁP 5: Port conflict

```bash
# Kill process ở port 3000
lsof -ti:3000 | xargs kill

# Hoặc đổi port trong vite.config.js:
server: {
  port: 3001,  // Đổi sang 3001
}
```

---

### ✅ GIẢI PHÁP 6: Auto-fix Script

**Chạy script tự động fix:**

```bash
chmod +x setup-fix.sh
./setup-fix.sh
```

Script sẽ:
1. ✓ Check Node version
2. ✓ Clean cache
3. ✓ Reinstall dependencies
4. ✓ Create test app
5. ✓ Start dev server

---

## 🔍 DEBUG Checklist

Kiểm tra từng mục:

- [ ] **Terminal có lỗi không?**
  - Nhìn vào terminal đang chạy `npm run dev`
  - Copy lỗi (nếu có) và gửi cho tôi

- [ ] **Browser Console có lỗi không?** (F12)
  - Tab Console có dòng đỏ?
  - Screenshot và gửi cho tôi

- [ ] **File structure đúng không?**
  ```bash
  ls -la src/
  ```
  - Phải thấy: App.jsx, main.jsx, index.css

- [ ] **Node version đủ không?**
  ```bash
  node -v  # >= 18.0.0
  ```

- [ ] **Dependencies đã cài chưa?**
  ```bash
  ls node_modules/react
  ```
  - Phải thấy thư mục react

---

## 📸 Gửi cho tôi

Nếu vẫn không work, copy và gửi:

### 1. Terminal Output
```bash
npm run dev
# Copy toàn bộ output
```

### 2. Browser Console
- F12 → Console tab
- Screenshot hoặc copy text lỗi

### 3. File List
```bash
ls -R src/
```

### 4. Package Info
```bash
npm list --depth=0
```

---

## 🚨 Lỗi thường gặp

### Lỗi: "Cannot find module 'react'"
```bash
npm install react react-dom
```

### Lỗi: "Unexpected token '<'"
- JSX syntax error
- Kiểm tra file .jsx có thiếu dấu ngoặc

### Lỗi: "Failed to fetch"
- Port 3000 bị chiếm
- Đổi sang port khác hoặc kill process

### Lỗi: "ENOENT: no such file"
- File bị thiếu
- Re-download project

---

## ⚡ Nuclear Option (Cuối cùng)

**Nếu TẤT CẢ đều fail:**

```bash
# Xóa TOÀN BỘ và cài lại
cd ..
rm -rf vaaca-react
# Re-download project
cd vaaca-react
npm install
npm run dev
```

---

## ✅ Khi nào biết đã OK?

**Terminal:**
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:3000/
```

**Browser:**
- Thấy background màu xanh đen
- Thấy logo "VAACA" ở header
- Thấy chữ "Precision Manufacturing..."
- KHÔNG có lỗi console

---

## 💡 Tips

1. **Luôn check Terminal trước** - Lỗi thường hiện ở đây
2. **Luôn check Console** - Lỗi JS hiện ở đây
3. **Restart cả Terminal và Browser** khi đổi code
4. **Clear cache**: Ctrl+Shift+R (hard refresh)

---

**Good luck! 🚀**

Nếu vẫn không được, gửi cho tôi:
- Screenshot Terminal
- Screenshot Console (F12)
- Output của `npm list --depth=0`
