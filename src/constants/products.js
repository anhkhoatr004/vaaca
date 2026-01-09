// Mock data cho sản phẩm quán cafe
export const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Cà phê đen đá',
    price: 20000,
    category: 'coffee',
    stock: 100,
    description: 'Cà phê phin truyền thống'
  },
  {
    id: '2',
    name: 'Cà phê sữa đá',
    price: 25000,
    category: 'coffee',
    stock: 100,
    description: 'Cà phê phin với sữa đặc'
  },
  {
    id: '3',
    name: 'Bạc xỉu',
    price: 25000,
    category: 'coffee',
    stock: 100,
    description: 'Cà phê sữa nhạt'
  },
  {
    id: '4',
    name: 'Cà phê đen nóng',
    price: 18000,
    category: 'coffee',
    stock: 100,
    description: 'Cà phê phin nóng'
  },
  {
    id: '5',
    name: 'Cà phê sữa nóng',
    price: 23000,
    category: 'coffee',
    stock: 100,
    description: 'Cà phê phin nóng với sữa'
  },
  {
    id: '6',
    name: 'Cappuccino',
    price: 35000,
    category: 'coffee',
    stock: 50,
    description: 'Espresso với sữa bọt'
  },
  {
    id: '7',
    name: 'Latte',
    price: 35000,
    category: 'coffee',
    stock: 50,
    description: 'Espresso với nhiều sữa'
  },
  {
    id: '8',
    name: 'Trà đào cam sả',
    price: 30000,
    category: 'tea',
    stock: 80,
    description: 'Trá xanh với đào, cam và sả'
  },
  {
    id: '9',
    name: 'Trà sữa trân châu',
    price: 32000,
    category: 'tea',
    stock: 80,
    description: 'Trà sữa với trân châu đường đen'
  },
  {
    id: '10',
    name: 'Sinh tố bơ',
    price: 35000,
    category: 'smoothie',
    stock: 60,
    description: 'Sinh tố bơ tươi'
  },
  {
    id: '11',
    name: 'Nước cam ép',
    price: 30000,
    category: 'juice',
    stock: 70,
    description: 'Nước cam tươi ép'
  },
  {
    id: '12',
    name: 'Bánh mì',
    price: 15000,
    category: 'food',
    stock: 50,
    description: 'Bánh mì thịt'
  }
];

export const CATEGORIES = [
  { id: 'coffee', name: 'Cà phê', icon: '☕' },
  { id: 'tea', name: 'Trà', icon: '🍵' },
  { id: 'smoothie', name: 'Sinh tố', icon: '🥤' },
  { id: 'juice', name: 'Nước ép', icon: '🧃' },
  { id: 'food', name: 'Đồ ăn', icon: '🍞' }
];

// Trạng thái đơn hàng
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Loại queue item (nhập sản phẩm hoặc tạo đơn hàng)
export const QUEUE_ITEM_TYPE = {
  ADD_PRODUCT: 'add_product',
  CREATE_ORDER: 'create_order'
};
