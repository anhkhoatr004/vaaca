# 🔧 VAACA - Troubleshooting Blank Screen

## ❌ Vấn đề: Màn hình trắng (localhost:3000)

### ✅ Bước 1: Kiểm tra Terminal

**Mở terminal đang chạy `npm run dev` và kiểm tra:**

```bash
# Output mong đợi:
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Nếu thấy lỗi → Copy lỗi và xem Bước 6**

---

### ✅ Bước 2: Mở Browser Console

**Trong trình duyệt:**
1. Nhấn `F12` hoặc `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. Click tab "Console"
3. Xem có lỗi màu đỏ không?

**Lỗi thường gặp:**

#### Lỗi A: "Failed to resolve module specifier"
```
❌ Failed to resolve module specifier "react"
```
**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Lỗi B: "Unexpected token '<'"
```
❌ Unexpected token '<'
```
**Fix:** Lỗi JSX syntax. Kiểm tra file `.jsx` có lỗi cú pháp.

#### Lỗi C: "Cannot find module"
```
❌ Cannot find module './components/Header'
```
**Fix:** Kiểm tra import path, phân biệt hoa/thường.

---

### ✅ Bước 3: Kiểm tra File Structure

**Chạy lệnh này để verify structure:**

```bash
cd vaaca-react
ls -la src/
ls -la src/components/
```

**Output mong đợi:**
```
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── TrustIndicators.jsx
│   ├── Capabilities.jsx
│   ├── Industries.jsx
│   ├── SupplyChain.jsx
│   ├── Footer.jsx
│   └── ScrollReveal.jsx
├── data/
│   └── database.js
└── i18n/
    └── config.js
```

**Nếu thiếu file → Re-download project từ outputs**

---

### ✅ Bước 4: Test với Minimal App

**Tạo file test đơn giản:**

**File: `src/App.test.jsx`**
```jsx
function AppTest() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      backgroundColor: '#0f172a',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>VAACA Test - React is Working! ✅</h1>
      <p>If you see this, React is rendering correctly.</p>
    </div>
  );
}

export default AppTest;
```

**Sửa `src/main.jsx` tạm thời:**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppTest from './App.test.jsx'  // ← Test app
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppTest />  {/* ← Thay vì <App /> */}
  </React.StrictMode>,
)
```

**Save và refresh browser:**
- ✅ Thấy "React is Working!" → React OK, lỗi ở components
- ❌ Vẫn blank → Lỗi fundamental, xem Bước 5

---

### ✅ Bước 5: Kiểm tra Dependencies

**Chạy lệnh:**
```bash
npm list react react-dom react-i18next i18next
```

**Output mong đợi:**
```
vaaca-react@1.0.0
├── react@18.2.0
├── react-dom@18.2.0
├── react-i18next@13.5.0
└── i18next@23.7.8
```

**Nếu thiếu hoặc lỗi version:**
```bash
npm install react@18.2.0 react-dom@18.2.0 react-i18next@13.5.0 i18next@23.7.8
```

---

### ✅ Bước 6: Common Fixes

#### Fix 1: Clear Cache & Reinstall
```bash
# Stop dev server (Ctrl+C)
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

#### Fix 2: Port Conflict
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or change port in vite.config.js:
server: {
  port: 3001,  // ← Change to 3001
}
```

#### Fix 3: Check Node Version
```bash
node -v
# Should be 18+ or 20+
# If lower, update Node.js
```

#### Fix 4: Verify index.html
```bash
cat index.html | grep "root"
# Should output: <div id="root"></div>
```

---

### ✅ Bước 7: Debug i18n Issue

**i18n có thể gây blank screen nếu config sai.**

**Tạo file simple i18n:**

**File: `src/i18n/config.simple.js`**
```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: { "test": "Test" }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

**Sửa `src/main.jsx`:**
```jsx
import './i18n/config.simple.js'  // ← Thay vì config.js
```

---

### ✅ Bước 8: Minimal Working Version

**Nếu vẫn blank, dùng version tối giản này:**

**File: `src/main.minimal.jsx`**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function MinimalApp() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">VAACA</h1>
        <p className="text-xl">React + Vite is Running ✅</p>
        <p className="text-sm text-gray-400 mt-4">
          Tailwind CSS is working if text is white
        </p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MinimalApp />
  </React.StrictMode>,
)
```

**Rename files:**
```bash
mv src/main.jsx src/main.jsx.backup
mv src/main.minimal.jsx src/main.jsx
npm run dev
```

---

## 🔍 Debug Checklist

- [ ] Terminal shows "ready" without errors
- [ ] Browser console (F12) has no red errors
- [ ] All files exist in correct locations
- [ ] Dependencies installed (`node_modules/` exists)
- [ ] Node version 18+ (`node -v`)
- [ ] Port 3000 is free
- [ ] Test app works
- [ ] Tailwind CSS loads

---

## 📞 Still Not Working?

### Copy này và gửi cho tôi:

```bash
# 1. Terminal output
npm run dev

# 2. Browser console errors (F12 → Console tab)
# Screenshot hoặc copy text

# 3. File structure
ls -R src/

# 4. Package info
npm list --depth=0

# 5. Node version
node -v
npm -v
```

---

## ⚡ Quick Reset (Nuclear Option)

```bash
# Complete reset
rm -rf node_modules package-lock.json .vite dist
npm cache clean --force
npm install
npm run dev
```

---

## ✅ Expected Working State

**When working correctly, you should see:**

1. **Terminal:**
   ```
   VITE v5.0.8  ready in 500 ms
   ➜  Local:   http://localhost:3000/
   ```

2. **Browser:**
   - Dark navy background
   - VAACA logo in header
   - Hero section with text visible
   - No console errors

3. **Network tab (F12 → Network):**
   - main.jsx loads (status 200)
   - index.css loads (status 200)
   - No 404 errors

---

## 🎯 Most Likely Causes

**Based on blank screen:**

1. **70% chance**: Missing dependencies or bad install
   - **Fix**: `rm -rf node_modules && npm install`

2. **20% chance**: Import path errors or syntax errors
   - **Fix**: Check browser console

3. **5% chance**: Port conflict
   - **Fix**: Change port or kill process

4. **5% chance**: Node version too old
   - **Fix**: Update to Node 18+

---

Good luck! 🚀
