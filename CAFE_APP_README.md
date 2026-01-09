# 🎤 AI Voice Cafe Management App

Web app quản lý quán cafe với tính năng AI Voice Assistant sử dụng Gemini AI.

## ✨ Tính năng

### 1. 📦 Nhập sản phẩm bằng giọng nói
- Nói để thêm sản phẩm mới vào kho
- AI tự động phân tích: tên, giá, loại, số lượng tồn kho
- Ví dụ: *"Thêm sản phẩm trà sữa trân châu giá 35000 đồng số lượng 50"*

### 2. 🛒 Tạo đơn hàng bằng giọng nói
- Nói để tạo đơn hàng nhanh chóng
- AI tự động nhận diện sản phẩm, số lượng và ghi chú đặc biệt
- Ví dụ: *"2 ly cafe đen đá không đường"*, *"1 trà sữa và 1 sinh tố bơ, ít đá"*

### 3. 📋 Queue System (Hàng đợi)
- Xử lý bất đồng bộ, không cần chờ AI
- Hỗ trợ tối đa 10 đơn cùng lúc
- Xác nhận từng đơn hoặc xác nhận hàng loạt
- AI xử lý trong background

### 4. 🖨️ Xuất và in hóa đơn
- In hóa đơn chuyên nghiệp
- Có đầy đủ thông tin: sản phẩm, số lượng, giá, tổng tiền, ghi chú
- Hỗ trợ in trực tiếp từ trình duyệt

### 5. 📊 Quản lý sản phẩm & đơn hàng
- Xem, sửa, xóa sản phẩm
- Quản lý tồn kho
- Theo dõi đơn hàng theo ngày/tuần/tháng
- Thống kê doanh thu

## 🚀 Cài đặt

```bash
# Clone repository
git clone <repo-url>
cd vaaca

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## ⚙️ Cấu hình

### 1. Lấy Gemini API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập bằng tài khoản Google
3. Click "Get API Key" hoặc "Create API Key"
4. Copy API key

### 2. Cấu hình trong ứng dụng

1. Mở ứng dụng
2. Vào trang **Settings** (⚙️)
3. Nhập Gemini API Key
4. Điền thông tin quán (tùy chọn):
   - Tên quán
   - Địa chỉ
   - Số điện thoại
5. Click "Lưu cài đặt"

## 📱 Sử dụng

### Nhập sản phẩm

1. Vào trang **Nhập hàng** (📦)
2. Nhấn nút microphone
3. Nói thông tin sản phẩm
   - VD: *"Thêm cappuccino giá 35000 số lượng 30"*
4. AI xử lý và thêm vào Queue
5. Kiểm tra và xác nhận tại trang Queue

### Tạo đơn hàng

1. Vào trang **Đơn hàng** (🛒)
2. Nhấn nút microphone
3. Nói đơn hàng
   - VD: *"3 ly cafe sữa đá, 1 bạc xỉu không đường"*
4. AI phân tích và tạo đơn
5. Xác nhận tại trang Queue

### Xử lý Queue

1. Vào trang **Queue** (📋)
2. Xem danh sách các đơn đang chờ xử lý
3. Kiểm tra thông tin AI đã phân tích
4. Options:
   - **Xác nhận**: Lưu vào hệ thống
   - **Xóa**: Bỏ đơn này
   - **Xác nhận tất cả**: Lưu tất cả các đơn
   - **Xóa tất cả**: Xóa toàn bộ queue

### In hóa đơn

1. Vào trang **Đơn hàng** (từ menu hoặc HomePage)
2. Tìm đơn hàng cần in
3. Click "🖨️ In hóa đơn"
4. Cửa sổ mới sẽ mở ra
5. Click "In hóa đơn" để in

## 🏗️ Cấu trúc project

```
src/
├── components/       # React components
│   ├── Layout.jsx   # Layout với navigation
│   └── VoiceButton.jsx  # Voice recording button
├── contexts/        # React contexts
│   └── AppContext.jsx   # Global state management
├── hooks/           # Custom hooks
│   └── useSpeechRecognition.js  # Web Speech API hook
├── pages/           # Page components
│   ├── HomePage.jsx
│   ├── AddProductPage.jsx
│   ├── CreateOrderPage.jsx
│   ├── QueuePage.jsx
│   ├── ProductsPage.jsx
│   ├── OrdersPage.jsx
│   └── SettingsPage.jsx
├── services/        # Services
│   ├── geminiService.js  # Gemini AI integration
│   └── storage.js   # LocalStorage service
├── utils/           # Utilities
│   └── invoice.js   # Invoice printing
├── constants/       # Constants & mock data
│   └── products.js  # Product data & constants
└── App.jsx         # Main app component
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **AI**: Google Gemini AI (gemini-pro)
- **Voice**: Web Speech API
- **Storage**: LocalStorage (demo mode)
- **Notifications**: React Hot Toast
- **PDF/Print**: HTML + CSS Print

## 🌟 Tính năng nổi bật

### ⚡ Xử lý bất đồng bộ
- Không cần chờ AI xử lý xong
- Có thể nói nhiều đơn liên tục
- Queue tối đa 10 items
- Xác nhận hàng loạt

### 🎯 Mobile-First Design
- Tối ưu cho điện thoại
- Bottom navigation dễ thao tác
- Responsive design
- Touch-friendly UI

### 🧠 AI Thông minh
- Hiểu ngữ cảnh tiếng Việt
- Tự động mapping sản phẩm
- Phân tích ghi chú (không đường, ít đá, etc)
- Tính toán tổng tiền chính xác

### 💾 Data Persistence
- Lưu trữ local (không cần server)
- Dữ liệu tồn tại giữa các sessions
- Backup/restore dễ dàng

## 🔧 Troubleshooting

### Voice không hoạt động
- Đảm bảo cho phép microphone trong browser
- Chỉ hoạt động trên HTTPS hoặc localhost
- Kiểm tra browser có hỗ trợ Web Speech API không

### AI không phân tích đúng
- Kiểm tra API key đã cấu hình chưa
- Nói rõ ràng, tránh nhiễu
- Đảm bảo có kết nối internet

### Dữ liệu bị mất
- Dữ liệu lưu trong localStorage
- Xóa cache browser sẽ mất dữ liệu
- Không dùng chế độ ẩn danh

## 📝 License

MIT License

## 👨‍💻 Author

AI Voice Cafe Management App - Powered by Gemini AI

---

**Lưu ý**: Đây là bản demo sử dụng LocalStorage. Để production, cần tích hợp backend (PocketBase hoặc database khác).
