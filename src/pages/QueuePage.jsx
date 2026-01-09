import { useApp } from '../contexts/AppContext';
import { QUEUE_ITEM_TYPE } from '../constants/products';
import toast from 'react-hot-toast';

const QueuePage = () => {
  const { queueItems, confirmQueueItem, removeFromQueue, confirmAllQueue, clearQueue } = useApp();

  const handleConfirm = (itemId) => {
    try {
      confirmQueueItem(itemId);
      toast.success('Đã xác nhận thành công!');
    } catch (error) {
      toast.error('Lỗi khi xác nhận: ' + error.message);
    }
  };

  const handleRemove = (itemId) => {
    removeFromQueue(itemId);
    toast.success('Đã xóa khỏi hàng đợi');
  };

  const handleConfirmAll = () => {
    if (queueItems.length === 0) {
      toast.error('Không có item nào trong hàng đợi');
      return;
    }

    try {
      confirmAllQueue();
      toast.success(`Đã xác nhận ${queueItems.length} items!`);
    } catch (error) {
      toast.error('Lỗi khi xác nhận: ' + error.message);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả items trong hàng đợi?')) {
      clearQueue();
      toast.success('Đã xóa tất cả');
    }
  };

  const renderQueueItem = (item) => {
    const isProduct = item.type === QUEUE_ITEM_TYPE.ADD_PRODUCT;
    const data = item.data;

    return (
      <div key={item.id} className="bg-white rounded-lg shadow p-4 mb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{isProduct ? '📦' : '🛒'}</span>
            <h3 className="font-semibold text-gray-800">
              {isProduct ? 'Nhập sản phẩm' : 'Đơn hàng'}
            </h3>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleTimeString('vi-VN')}
          </span>
        </div>

        {/* Voice Input */}
        <div className="bg-blue-50 rounded p-3 mb-3">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Giọng nói:</span> "{item.voiceInput}"
          </p>
        </div>

        {/* Parsed Data */}
        <div className="bg-gray-50 rounded p-3 mb-3">
          {isProduct ? (
            <div className="space-y-1 text-sm">
              <p><span className="font-semibold">Tên:</span> {data.name}</p>
              <p><span className="font-semibold">Giá:</span> {data.price?.toLocaleString('vi-VN')}đ</p>
              <p><span className="font-semibold">Loại:</span> {data.category}</p>
              <p><span className="font-semibold">Tồn kho:</span> {data.stock}</p>
              {data.description && (
                <p><span className="font-semibold">Mô tả:</span> {data.description}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              {data.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.quantity}x {item.productName}</span>
                  <span className="font-semibold">
                    {(item.quantity * item.price).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
              {data.notes && (
                <p className="text-gray-600">
                  <span className="font-semibold">Ghi chú:</span> {data.notes}
                </p>
              )}
              <div className="pt-2 border-t">
                <p className="font-bold text-green-600 text-right">
                  Tổng: {data.total?.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => handleConfirm(item.id)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            ✓ Xác nhận
          </button>
          <button
            onClick={() => handleRemove(item.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            ✕ Xóa
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hàng đợi</h2>
            <p className="text-sm text-gray-600">
              {queueItems.length}/10 items
            </p>
          </div>
          {queueItems.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={handleConfirmAll}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors text-sm"
              >
                ✓ Xác nhận tất cả
              </button>
              <button
                onClick={handleClearAll}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors text-sm"
              >
                Xóa tất cả
              </button>
            </div>
          )}
        </div>

        {queueItems.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-6xl">📋</span>
            <p className="text-gray-600 mt-3">Hàng đợi trống</p>
            <p className="text-sm text-gray-500 mt-1">
              Các đơn hàng và sản phẩm sẽ xuất hiện ở đây
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 rounded p-3">
            <p className="text-sm text-blue-800">
              💡 Hệ thống có thể xử lý tối đa 10 items cùng lúc. Xác nhận để giải phóng hàng đợi.
            </p>
          </div>
        )}
      </div>

      {/* Queue Items */}
      {queueItems.map(renderQueueItem)}
    </div>
  );
};

export default QueuePage;
