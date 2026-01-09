import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
  }

  initialize(apiKey) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  isInitialized() {
    return this.model !== null;
  }

  /**
   * Phân tích voice input để nhập sản phẩm
   * @param {string} voiceInput - Text từ voice recognition
   * @param {Array} existingProducts - Danh sách sản phẩm hiện có
   * @returns {Promise<Object>} - Thông tin sản phẩm được phân tích
   */
  async parseProductInput(voiceInput, existingProducts) {
    if (!this.isInitialized()) {
      throw new Error('Gemini service not initialized');
    }

    const productList = existingProducts.map(p => `- ${p.name}: ${p.price}đ`).join('\n');

    const prompt = `
Bạn là trợ lý AI cho quán cafe. Hãy phân tích câu nói sau để trích xuất thông tin sản phẩm:

"${voiceInput}"

Danh sách sản phẩm hiện có:
${productList}

Hãy trả về JSON với format sau (chỉ trả về JSON, không giải thích):
{
  "name": "tên sản phẩm",
  "price": giá_số,
  "category": "coffee|tea|smoothie|juice|food",
  "stock": số_lượng_tồn_kho,
  "description": "mô tả ngắn"
}

Lưu ý:
- Nếu người dùng nói về sản phẩm đã có, lấy thông tin từ danh sách hiện có
- Nếu là sản phẩm mới, tự động điền category phù hợp
- Nếu không có thông tin stock, mặc định là 0
- Price phải là số không có dấu phẩy hay chữ
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    } catch (error) {
      console.error('Error parsing product input:', error);
      throw error;
    }
  }

  /**
   * Phân tích voice input để tạo đơn hàng
   * @param {string} voiceInput - Text từ voice recognition
   * @param {Array} products - Danh sách sản phẩm
   * @returns {Promise<Object>} - Thông tin đơn hàng được phân tích
   */
  async parseOrderInput(voiceInput, products) {
    if (!this.isInitialized()) {
      throw new Error('Gemini service not initialized');
    }

    const productList = products.map(p =>
      `- ${p.name}: ${p.price}đ (ID: ${p.id})`
    ).join('\n');

    const prompt = `
Bạn là trợ lý AI cho quán cafe. Hãy phân tích câu nói sau để tạo đơn hàng:

"${voiceInput}"

Danh sách sản phẩm:
${productList}

Hãy trả về JSON với format sau (chỉ trả về JSON, không giải thích):
{
  "items": [
    {
      "productId": "id_sản_phẩm",
      "productName": "tên sản phẩm",
      "quantity": số_lượng,
      "price": giá_đơn_vị
    }
  ],
  "notes": "ghi chú (ví dụ: không đường, ít đá, etc)",
  "total": tổng_tiền
}

Lưu ý:
- Phân tích số lượng chính xác (2 ly, 3 cốc, etc)
- Tìm sản phẩm phù hợp nhất từ danh sách
- Ghi chú các yêu cầu đặc biệt (không đường, ít đá, nhiều đá, etc)
- Total = tổng số tiền của tất cả items
- Nếu không rõ số lượng, mặc định là 1
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    } catch (error) {
      console.error('Error parsing order input:', error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
