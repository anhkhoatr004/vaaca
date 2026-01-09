// Local Storage Service để quản lý dữ liệu
const STORAGE_KEYS = {
  PRODUCTS: 'cafe_products',
  ORDERS: 'cafe_orders',
  SETTINGS: 'cafe_settings'
};

export const storageService = {
  // Products
  getProducts: () => {
    try {
      const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return products ? JSON.parse(products) : null;
    } catch (error) {
      console.error('Error getting products:', error);
      return null;
    }
  },

  saveProducts: (products) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      return true;
    } catch (error) {
      console.error('Error saving products:', error);
      return false;
    }
  },

  // Orders
  getOrders: () => {
    try {
      const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  },

  saveOrders: (orders) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return true;
    } catch (error) {
      console.error('Error saving orders:', error);
      return false;
    }
  },

  addOrder: (order) => {
    try {
      const orders = storageService.getOrders();
      orders.push(order);
      return storageService.saveOrders(orders);
    } catch (error) {
      console.error('Error adding order:', error);
      return false;
    }
  },

  // Settings
  getSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        geminiApiKey: '',
        shopName: 'Quán Cafe',
        shopAddress: '',
        shopPhone: ''
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        geminiApiKey: '',
        shopName: 'Quán Cafe',
        shopAddress: '',
        shopPhone: ''
      };
    }
  },

  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  // Clear all data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
};
