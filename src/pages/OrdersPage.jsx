import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { ORDER_STATUS } from '../constants/products';
import { printInvoice } from '../utils/invoice';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const { orders, updateOrderStatus, settings } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('today');

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (filterStatus !== 'all' && order.status !== filterStatus) {
      return false;
    }

    // Date filter
    const orderDate = new Date(order.createdAt);
    const today = new Date();

    if (filterDate === 'today') {
      return orderDate.toDateString() === today.toDateString();
    } else if (filterDate === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return orderDate >= weekAgo;
    } else if (filterDate === 'month') {
      return orderDate.getMonth() === today.getMonth() &&
             orderDate.getFullYear() === today.getFullYear();
    }

    return true;
  });

  const handlePrint = (order) => {
    printInvoice(order, settings);
    toast.success('Đang mở cửa sổ in...');
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success('Đã cập nhật trạng thái');
  };

  const totalRevenue = filteredOrders.reduce((sum, order) =>
    order.status !== ORDER_STATUS.CANCELLED ? sum + order.total : sum, 0
  );

  return (
    <div className="space-y-4">
      {/* Header & Stats */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Đơn hàng</h2>
            <p className="text-sm text-gray-600">{filteredOrders.length} đơn</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Doanh thu</p>
            <p className="text-xl font-bold text-green-600">
              {totalRevenue.toLocaleString('vi-VN')}đ
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Date Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thời gian
            </label>
            <div className="flex gap-2 overflow-x-auto">
              {[
                { value: 'today', label: 'Hôm nay' },
                { value: 'week', label: 'Tuần này' },
                { value: 'month', label: 'Tháng này' },
                { value: 'all', label: 'Tất cả' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilterDate(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    filterDate === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trạng thái
            </label>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </button>
              {Object.entries({
                pending: 'Chờ xử lý',
                processing: 'Đang xử lý',
                completed: 'Hoàn thành',
                cancelled: 'Đã hủy'
              }).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setFilterStatus(value)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    filterStatus === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <span className="text-6xl">🛒</span>
          <p className="text-gray-600 mt-3">Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.reverse().map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow p-4">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                  className={`text-sm px-3 py-1 rounded-full font-medium border-2 ${
                    order.status === ORDER_STATUS.COMPLETED
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : order.status === ORDER_STATUS.CANCELLED
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : order.status === ORDER_STATUS.PROCESSING
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}
                >
                  <option value={ORDER_STATUS.PENDING}>Chờ xử lý</option>
                  <option value={ORDER_STATUS.PROCESSING}>Đang xử lý</option>
                  <option value={ORDER_STATUS.COMPLETED}>Hoàn thành</option>
                  <option value={ORDER_STATUS.CANCELLED}>Đã hủy</option>
                </select>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.quantity}x {item.productName}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {(item.quantity * item.price).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {order.notes && (
                <div className="bg-yellow-50 rounded p-2 mb-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Ghi chú:</span> {order.notes}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-bold text-lg text-gray-800">Tổng cộng</span>
                <span className="font-bold text-lg text-green-600">
                  {order.total.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Actions */}
              <button
                onClick={() => handlePrint(order)}
                className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors"
              >
                🖨️ In hóa đơn
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
