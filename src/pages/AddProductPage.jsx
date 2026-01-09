import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { geminiService } from '../services/geminiService';
import { QUEUE_ITEM_TYPE } from '../constants/products';
import VoiceButton from '../components/VoiceButton';
import toast from 'react-hot-toast';

const AddProductPage = () => {
  const { products, addToQueue, settings } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceInput = async (transcript) => {
    if (!settings.geminiApiKey) {
      toast.error('Vui lòng cấu hình Gemini API Key trong Settings');
      return;
    }

    setIsProcessing(true);
    try {
      // Initialize Gemini if not already
      if (!geminiService.isInitialized()) {
        geminiService.initialize(settings.geminiApiKey);
      }

      // Parse voice input
      const productData = await geminiService.parseProductInput(transcript, products);

      // Add to queue
      await addToQueue({
        type: QUEUE_ITEM_TYPE.ADD_PRODUCT,
        data: productData,
        voiceInput: transcript
      });

      toast.success('Đã thêm vào hàng đợi! Kiểm tra tại Queue để xác nhận.');
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast.error('Lỗi khi xử lý giọng nói: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nhập sản phẩm</h2>
        <p className="text-gray-600 mb-6">
          Sử dụng giọng nói để thêm sản phẩm mới vào kho
        </p>

        {/* Voice Input */}
        <div className="flex flex-col items-center py-8">
          <VoiceButton onTranscript={handleVoiceInput} />

          {isProcessing && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm text-gray-600">Đang xử lý...</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">Hướng dẫn sử dụng</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Nhấn nút microphone và nói thông tin sản phẩm</li>
            <li>• Ví dụ: "Thêm sản phẩm trà sữa trân châu giá 35000 đồng số lượng 50"</li>
            <li>• Hoặc: "Nhập cafe đen nóng 20 ly"</li>
            <li>• AI sẽ tự động phân tích và thêm vào hàng đợi</li>
            <li>• Kiểm tra và xác nhận tại trang Queue</li>
          </ul>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Danh sách sản phẩm ({products.length})
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {products.map(product => (
            <div key={product.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.price.toLocaleString('vi-VN')}đ • Tồn: {product.stock}
                </p>
              </div>
              <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                {product.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
