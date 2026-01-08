#!/bin/bash

# VAACA Project - Auto Setup & Fix Script
# Run this if you encounter blank screen or errors

echo "🚀 VAACA Auto-Fix Script"
echo "========================"
echo ""

# Step 1: Check Node version
echo "📌 Step 1: Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old: $(node -v)"
    echo "   Please update to Node.js 18 or higher"
    echo "   Download from: https://nodejs.org/"
    exit 1
else
    echo "✅ Node.js version OK: $(node -v)"
fi
echo ""

# Step 2: Clean install
echo "📌 Step 2: Cleaning old files..."
rm -rf node_modules package-lock.json .vite dist
echo "✅ Cleaned"
echo ""

# Step 3: Install dependencies
echo "📌 Step 3: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Step 4: Verify critical files
echo "📌 Step 4: Verifying file structure..."
MISSING_FILES=0

check_file() {
    if [ ! -f "$1" ]; then
        echo "❌ Missing: $1"
        MISSING_FILES=1
    fi
}

check_file "src/main.jsx"
check_file "src/App.jsx"
check_file "src/index.css"
check_file "index.html"
check_file "vite.config.js"
check_file "tailwind.config.js"

if [ $MISSING_FILES -eq 1 ]; then
    echo "❌ Some files are missing. Please re-download the project."
    exit 1
fi
echo "✅ All critical files present"
echo ""

# Step 5: Create backup and test file
echo "📌 Step 5: Creating backup files..."
cp src/main.jsx src/main.jsx.backup 2>/dev/null
cp src/i18n/config.js src/i18n/config.js.backup 2>/dev/null
echo "✅ Backups created"
echo ""

# Step 6: Test with minimal app
echo "📌 Step 6: Would you like to test with minimal app? (y/n)"
read -r RESPONSE
if [[ "$RESPONSE" =~ ^[Yy]$ ]]; then
    echo "Creating minimal test app..."
    cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function TestApp() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
          ✅ VAACA Test
        </h1>
        <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '30px' }}>
          React + Vite is running correctly!
        </p>
        <div style={{ 
          backgroundColor: '#1e293b', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #0ea5e9',
          textAlign: 'left'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>✅ Working:</p>
          <ul style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>React rendering</li>
            <li>Vite dev server</li>
            <li>CSS loading</li>
            <li>JSX compilation</li>
          </ul>
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#94a3b8' }}>
            To restore full app: <code style={{ 
              backgroundColor: '#334155', 
              padding: '2px 6px', 
              borderRadius: '3px' 
            }}>mv src/main.jsx.backup src/main.jsx</code>
          </p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)
EOF
    echo "✅ Minimal test app created"
fi
echo ""

# Step 7: Start dev server
echo "📌 Step 7: Starting development server..."
echo "========================================="
echo ""
echo "🌐 Open your browser to: http://localhost:3000"
echo ""
echo "If you see a test message, React is working!"
echo "Press Ctrl+C to stop the server"
echo ""
echo "To restore full app later:"
echo "  mv src/main.jsx.backup src/main.jsx"
echo ""
echo "Starting in 3 seconds..."
sleep 3

npm run dev
