import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    toast.success('Đã lưu cài đặt!');
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả dữ liệu?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cài đặt</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Shop Info */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên quán
            </label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Quán Cafe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              name="shopAddress"
              value={formData.shopAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Đường ABC, Quận 1, TP.HCM"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="shopPhone"
              value={formData.shopPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0123456789"
            />
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                name="geminiApiKey"
                value={formData.geminiApiKey}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20"
                placeholder="Nhập API key từ Google AI Studio"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showApiKey ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Lấy API key tại:{' '}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              💾 Lưu cài đặt
            </button>
          </div>
        </form>
      </div>

      {/* Info Cards */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Lưu ý quan trọng</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Gemini API Key là bắt buộc để sử dụng tính năng voice AI</li>
          <li>• API key được lưu trên trình duyệt của bạn (localStorage)</li>
          <li>• Dữ liệu chỉ tồn tại trên thiết bị này</li>
          <li>• Xóa dữ liệu trình duyệt sẽ mất tất cả thông tin</li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Hướng dẫn lấy API Key</h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Truy cập Google AI Studio</li>
          <li>Đăng nhập bằng tài khoản Google</li>
          <li>Click "Get API Key"</li>
          <li>Tạo API key mới hoặc dùng key có sẵn</li>
          <li>Copy và paste vào ô bên trên</li>
        </ol>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-900 mb-3">🚨 Vùng nguy hiểm</h3>
        <button
          onClick={handleReset}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          🗑️ Xóa tất cả dữ liệu
        </button>
        <p className="text-xs text-red-700 mt-2">
          Thao tác này sẽ xóa tất cả sản phẩm, đơn hàng và cài đặt. Không thể hoàn tác!
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
