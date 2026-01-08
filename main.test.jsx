import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// MINIMAL TEST VERSION - Replace your src/main.jsx with this to test

function TestApp() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
          ✅ VAACA React is Working!
        </h1>
        <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '30px' }}>
          If you see this message, React + Vite is running correctly.
        </p>
        <div style={{ 
          backgroundColor: '#1e293b', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #0ea5e9'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px' }}>Next Steps:</p>
          <ol style={{ textAlign: 'left', fontSize: '14px', lineHeight: '1.8' }}>
            <li>✓ React is rendering</li>
            <li>✓ CSS is loading</li>
            <li>→ Now restore the original App.jsx</li>
          </ol>
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
