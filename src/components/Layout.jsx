import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { queueItems, settings } = useApp();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Trang chủ' },
    { path: '/add-product', icon: '📦', label: 'Nhập hàng' },
    { path: '/create-order', icon: '🛒', label: 'Đơn hàng' },
    { path: '/queue', icon: '📋', label: 'Queue', badge: queueItems.length },
    { path: '/settings', icon: '⚙️', label: 'Cài đặt' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">☕ {settings.shopName}</h1>
          <p className="text-sm text-blue-100">AI Voice Assistant</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex flex-col items-center py-2 px-3 min-w-[60px]
                    transition-colors duration-200
                    ${isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-500'
                    }
                  `}
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
