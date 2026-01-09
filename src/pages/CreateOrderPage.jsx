import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { geminiService } from '../services/geminiService';
import { QUEUE_ITEM_TYPE } from '../constants/products';
import VoiceButton from '../components/VoiceButton';
import toast from 'react-hot-toast';

const CreateOrderPage = () => {
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
      const orderData = await geminiService.parseOrderInput(transcript, products);

      // Add to queue
      await addToQueue({
        type: QUEUE_ITEM_TYPE.CREATE_ORDER,
        data: orderData,
        voiceInput: transcript
      });

      toast.success('Đã thêm đơn hàng vào hàng đợi! Kiểm tra tại Queue để xác nhận.');
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast.error('Lỗi khi xử lý giọng nói: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Get products by category
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const categoryLabels = {
    coffee: 'Cà phê',
    tea: 'Trà',
    smoothie: 'Sinh tố',
    juice: 'Nước ép',
    food: 'Đồ ăn'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tạo đơn hàng</h2>
        <p className="text-gray-600 mb-6">
          Sử dụng giọng nói để tạo đơn hàng nhanh chóng
        </p>

        {/* Voice Input */}
        <div className="flex flex-col items-center py-8">
          <VoiceButton onTranscript={handleVoiceInput} />

          {isProcessing && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-sm text-gray-600">Đang xử lý...</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-green-50 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-green-900 mb-2">Hướng dẫn sử dụng</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Nhấn nút microphone và nói đơn hàng của bạn</li>
            <li>• Ví dụ: "2 ly cafe đen đá không đường"</li>
            <li>• Hoặc: "1 trà sữa và 1 sinh tố bơ, ít đá"</li>
            <li>• AI sẽ tự động nhận diện sản phẩm và ghi chú</li>
            <li>• Đơn hàng sẽ được thêm vào hàng đợi để xác nhận</li>
          </ul>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Menu</h3>
        <div className="space-y-4">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold text-gray-700 mb-2">
                {categoryLabels[category] || category}
              </h4>
              <div className="space-y-2">
                {items.map(product => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {product.price.toLocaleString('vi-VN')}đ
                      </p>
                      <p className="text-xs text-gray-500">
                        Còn: {product.stock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
