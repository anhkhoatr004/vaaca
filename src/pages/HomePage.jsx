import { useApp } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { products, orders, queueItems } = useApp();

  const todayOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      label: 'Sản phẩm',
      value: products.length,
      icon: '📦',
      color: 'bg-blue-100 text-blue-600',
      link: '/products'
    },
    {
      label: 'Đơn hôm nay',
      value: todayOrders.length,
      icon: '🛒',
      color: 'bg-green-100 text-green-600',
      link: '/orders'
    },
    {
      label: 'Doanh thu',
      value: `${todayRevenue.toLocaleString('vi-VN')}đ`,
      icon: '💰',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      label: 'Hàng đợi',
      value: queueItems.length,
      icon: '📋',
      color: 'bg-purple-100 text-purple-600',
      link: '/queue'
    }
  ];

  const quickActions = [
    {
      title: 'Nhập sản phẩm',
      description: 'Sử dụng giọng nói để thêm sản phẩm mới',
      icon: '📦',
      color: 'bg-blue-500',
      link: '/add-product'
    },
    {
      title: 'Tạo đơn hàng',
      description: 'Tạo đơn hàng bằng giọng nói',
      icon: '🛒',
      color: 'bg-green-500',
      link: '/create-order'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} mb-3`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Thao tác nhanh</h2>
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`block ${action.color} text-white rounded-lg shadow-lg p-5 hover:opacity-90 transition-opacity`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{action.icon}</span>
              <div>
                <h3 className="text-xl font-bold">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      {todayOrders.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Đơn hàng gần đây</h2>
          <div className="space-y-2">
            {todayOrders.slice(-5).reverse().map(order => (
              <div key={order.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">
                    {order.items.map(item => `${item.quantity}x ${item.productName}`).join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString('vi-VN')}
                  </p>
                </div>
                <p className="font-bold text-green-600">
                  {order.total.toLocaleString('vi-VN')}đ
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
