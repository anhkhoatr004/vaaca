# PocketBase Integration Guide

## 📖 Tổng quan

Hướng dẫn chi tiết cách tích hợp PocketBase vào dự án VAACA để thay thế local database.

---

## 🎯 Tại sao dùng PocketBase?

- ✅ Backend đầy đủ trong 1 file executable
- ✅ Admin dashboard có sẵn
- ✅ RESTful + Realtime APIs
- ✅ File storage tích hợp
- ✅ Authentication built-in
- ✅ Dễ deploy
- ✅ Open source & miễn phí

---

## 📦 Bước 1: Cài đặt PocketBase

### Option A: Download Binary (Recommended)

```bash
# macOS/Linux
wget https://github.com/pocketbase/pocketbase/releases/download/v0.20.0/pocketbase_0.20.0_darwin_amd64.zip
unzip pocketbase_0.20.0_darwin_amd64.zip
chmod +x pocketbase

# Windows
# Download từ: https://github.com/pocketbase/pocketbase/releases
```

### Option B: Docker

```bash
docker pull ghcr.io/muchobien/pocketbase:latest
docker run -p 8090:8090 -v $(pwd)/pb_data:/pb_data ghcr.io/muchobien/pocketbase:latest
```

---

## 🚀 Bước 2: Chạy PocketBase

```bash
# Trong thư mục vaaca-react/
./pocketbase serve

# Output:
# > Server started at http://127.0.0.1:8090
# - REST API: http://127.0.0.1:8090/api/
# - Admin UI: http://127.0.0.1:8090/_/
```

**Truy cập Admin UI:**
- URL: http://127.0.0.1:8090/_/
- Tạo admin account (email + password)

---

## 🗄️ Bước 3: Tạo Collections

### 3.1. Settings Collection

**Name:** `settings`

**Schema:**
```javascript
{
  brandName: "text",
  brandSlogan: "text",
  brandIcon: "file",
  hotlineDisplay: "text",
  hotlineUrl: "url",
  headerCtaText: "text",
  headerCtaLink: "url"
}
```

**API Rules:**
- List/View: Public
- Create/Update/Delete: Admins only

### 3.2. Hero Collection

**Name:** `hero`

**Schema:**
```javascript
{
  badge: "text",
  titleLine1: "text",
  titleHighlight: "text",
  titleLine3: "text",
  description: "editor",  // Rich text
  btnPrimaryText: "text",
  btnPrimaryLink: "url",
  btnSecondaryText: "text",
  btnSecondaryLink: "url",
  backgroundImage: "file"
}
```

### 3.3. Clients Collection

**Name:** `clients`

**Schema:**
```javascript
{
  name: "text",
  logo: "file",
  order: "number",
  visible: "bool"
}
```

### 3.4. Capabilities Collection

**Name:** `capabilities`

**Schema:**
```javascript
{
  order: "number",
  icon: "select", // [precision, assembly, engineering]
  title: "text",
  title_vn: "text",
  description: "editor",
  description_vn: "editor",
  features: "json", // ["feature1", "feature2", "feature3"]
  features_vn: "json",
  spec: "text",
  spec_vn: "text",
  visible: "bool"
}
```

### 3.5. Industries Collection

**Name:** `industries`

**Schema:**
```javascript
{
  order: "number",
  icon: "select", // [aerospace, automotive, medical]
  title: "text",
  title_vn: "text",
  subtitle: "text",
  subtitle_vn: "text",
  description: "editor",
  description_vn: "editor",
  applications: "json",
  applications_vn: "json",
  image: "file",
  visible: "bool"
}
```

### 3.6. Supply Chain Steps

**Name:** `supply_chain_steps`

**Schema:**
```javascript
{
  order: "number",
  icon: "select", // [search, audit, risk, trace]
  title: "text",
  title_vn: "text",
  description: "text",
  description_vn: "text"
}
```

### 3.7. Supply Chain Stats

**Name:** `supply_chain_stats`

**Schema:**
```javascript
{
  order: "number",
  value: "text",
  unit: "text",
  prefix: "text",
  label: "text",
  label_vn: "text"
}
```

---

## 💻 Bước 4: Setup Frontend

### 4.1. Cài đặt PocketBase SDK

```bash
npm install pocketbase
```

### 4.2. Tạo Service File

**File:** `src/services/pocketbase.js`

```javascript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// Auto-refresh authentication
pb.autoCancellation(false);

// Services
export const settingsService = {
  async get() {
    const records = await pb.collection('settings').getList(1, 1);
    return records.items[0];
  }
};

export const heroService = {
  async get() {
    const records = await pb.collection('hero').getList(1, 1);
    return records.items[0];
  }
};

export const clientsService = {
  async getAll() {
    return await pb.collection('clients').getFullList({
      sort: 'order',
      filter: 'visible = true'
    });
  }
};

export const capabilitiesService = {
  async getAll() {
    return await pb.collection('capabilities').getFullList({
      sort: 'order',
      filter: 'visible = true'
    });
  }
};

export const industriesService = {
  async getAll() {
    return await pb.collection('industries').getFullList({
      sort: 'order',
      filter: 'visible = true'
    });
  }
};

export const supplyChainService = {
  async getSteps() {
    return await pb.collection('supply_chain_steps').getFullList({
      sort: 'order'
    });
  },
  async getStats() {
    return await pb.collection('supply_chain_stats').getFullList({
      sort: 'order'
    });
  }
};

// Helper: Get file URL
export const getFileUrl = (record, filename) => {
  return pb.files.getUrl(record, filename);
};

export default pb;
```

### 4.3. Tạo Custom Hook

**File:** `src/hooks/useData.js`

```javascript
import { useState, useEffect } from 'react';

export const useData = (service, method = 'get') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await service[method]();
        setData(result);
      } catch (err) {
        setError(err);
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service, method]);

  return { data, loading, error };
};
```

### 4.4. Update Components

**Before (using local data):**
```javascript
import db from '../data/database';

const Hero = () => {
  return <h1>{db.hero.titleLine1}</h1>;
};
```

**After (using PocketBase):**
```javascript
import { heroService } from '../services/pocketbase';
import { useData } from '../hooks/useData';

const Hero = () => {
  const { data: hero, loading } = useData(heroService, 'get');

  if (loading) return <div>Loading...</div>;
  
  return <h1>{hero?.titleLine1}</h1>;
};
```

---

## 🎨 Bước 5: Import Dữ liệu Ban đầu

### 5.1. Export từ database.js

**File:** `scripts/export-to-json.js`

```javascript
import fs from 'fs';
import db from '../src/data/database.js';

// Export each collection
fs.writeFileSync(
  'data-export/settings.json',
  JSON.stringify([db.settings], null, 2)
);

fs.writeFileSync(
  'data-export/hero.json',
  JSON.stringify([db.hero], null, 2)
);

fs.writeFileSync(
  'data-export/clients.json',
  JSON.stringify(db.clients, null, 2)
);

// ... export other collections
```

### 5.2. Import vào PocketBase

**Cách 1: Qua Admin UI**
1. Vào Admin UI → Collections
2. Chọn collection
3. Click "Import" → Upload JSON file

**Cách 2: Qua API Script**

```javascript
import pb from './src/services/pocketbase.js';

async function importData() {
  // Import settings
  const settings = JSON.parse(fs.readFileSync('data-export/settings.json'));
  await pb.collection('settings').create(settings[0]);
  
  // Import clients
  const clients = JSON.parse(fs.readFileSync('data-export/clients.json'));
  for (const client of clients) {
    await pb.collection('clients').create(client);
  }
  
  // ... import other data
}

importData();
```

---

## 🔐 Bước 6: Authentication (Optional)

Nếu cần phân quyền admin:

```javascript
// Login
await pb.admins.authWithPassword('admin@vaaca.com', 'password');

// Check auth
pb.authStore.isValid;

// Logout
pb.authStore.clear();
```

---

## 📱 Bước 7: Handle Loading States

**Create Loading Component:**

**File:** `src/components/Loading.jsx`

```javascript
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-navy">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-brand-grey font-mono text-sm">Loading VAACA...</p>
    </div>
  </div>
);

export default Loading;
```

**Update App.jsx:**

```javascript
import { useState, useEffect } from 'react';
import { settingsService } from './services/pocketbase';
import Loading from './components/Loading';

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await settingsService.get(); // Test connection
        setIsReady(true);
      } catch (err) {
        console.error('PocketBase connection failed:', err);
      }
    };
    init();
  }, []);

  if (!isReady) return <Loading />;

  return (
    // ... rest of app
  );
}
```

---

## 🚀 Bước 8: Production Setup

### Environment Variables

**File:** `.env.production`

```bash
VITE_POCKETBASE_URL=https://api.vaaca.com
```

**Update service:**

```javascript
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
```

### Deploy PocketBase

**Option 1: VPS (Ubuntu)**

```bash
# Install as systemd service
sudo nano /etc/systemd/system/pocketbase.service

# Content:
[Unit]
Description=PocketBase
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/pocketbase
ExecStart=/var/www/pocketbase/pocketbase serve --http="0.0.0.0:8090"
Restart=always

[Install]
WantedBy=multi-user.target

# Enable & start
sudo systemctl enable pocketbase
sudo systemctl start pocketbase
```

**Option 2: Docker Compose**

```yaml
version: '3.8'
services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    ports:
      - "8090:8090"
    volumes:
      - ./pb_data:/pb_data
    restart: unless-stopped
```

---

## 📊 Testing

```javascript
// Test connection
const testConnection = async () => {
  try {
    const health = await pb.health.check();
    console.log('PocketBase is healthy:', health);
  } catch (err) {
    console.error('Connection failed:', err);
  }
};
```

---

## 🔧 Troubleshooting

### CORS Error

**Fix trong PocketBase:**
1. Vào Admin UI
2. Settings → Application
3. CORS: Thêm domain frontend

### File Upload Issues

```javascript
// Upload file
const formData = new FormData();
formData.append('logo', file);
await pb.collection('clients').create(formData);
```

### Realtime Updates (Bonus)

```javascript
pb.collection('clients').subscribe('*', (e) => {
  console.log('Clients updated:', e.action);
  // Re-fetch data
});
```

---

## 📚 Resources

- **PocketBase Docs**: https://pocketbase.io/docs/
- **JavaScript SDK**: https://github.com/pocketbase/js-sdk
- **Examples**: https://github.com/pocketbase/pocketbase/tree/master/examples

---

**Next Steps:**
1. Hoàn thành Phase 1 (Basic features)
2. Test thoroughly
3. Integrate PocketBase
4. Deploy to production

**Good luck! 🚀**
