import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { CATEGORIES } from '../constants/products';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const { products, updateProduct, deleteProduct } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    updateProduct(editingId, editForm);
    setEditingId(null);
    toast.success('Đã cập nhật sản phẩm');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${productName}"?`)) {
      deleteProduct(productId);
      toast.success('Đã xóa sản phẩm');
    }
  };

  const handleChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quản lý sản phẩm</h2>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả ({products.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name} ({products.filter(p => p.category === cat.id).length})
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <span className="text-6xl">📦</span>
            <p className="text-gray-600 mt-3">Không có sản phẩm nào</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              {editingId === product.id ? (
                // Edit Mode
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Tên sản phẩm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => handleChange('price', parseInt(e.target.value))}
                      className="px-3 py-2 border border-gray-300 rounded"
                      placeholder="Giá"
                    />
                    <input
                      type="number"
                      value={editForm.stock}
                      onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                      className="px-3 py-2 border border-gray-300 rounded"
                      placeholder="Tồn kho"
                    />
                  </div>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Mô tả"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
                    >
                      ✓ Lưu
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded"
                    >
                      ✕ Hủy
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                    <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                      {CATEGORIES.find(c => c.id === product.category)?.name || product.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Giá</p>
                      <p className="text-lg font-bold text-green-600">
                        {product.price.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tồn kho</p>
                      <p className={`text-lg font-bold ${
                        product.stock > 10 ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
