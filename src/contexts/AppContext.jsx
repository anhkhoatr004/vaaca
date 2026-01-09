import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { INITIAL_PRODUCTS, ORDER_STATUS, QUEUE_ITEM_TYPE } from '../constants/products';
import { storageService } from '../services/storage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // State
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [queueItems, setQueueItems] = useState([]);
  const [settings, setSettings] = useState({
    geminiApiKey: '',
    shopName: 'Quán Cafe',
    shopAddress: '',
    shopPhone: ''
  });

  // Initialize data from localStorage
  useEffect(() => {
    const storedProducts = storageService.getProducts();
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      // Initialize with default products
      setProducts(INITIAL_PRODUCTS);
      storageService.saveProducts(INITIAL_PRODUCTS);
    }

    const storedOrders = storageService.getOrders();
    setOrders(storedOrders);

    const storedSettings = storageService.getSettings();
    setSettings(storedSettings);
  }, []);

  // Product functions
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    storageService.saveProducts(updatedProducts);
    return newProduct;
  };

  const updateProduct = (productId, updates) => {
    const updatedProducts = products.map(p =>
      p.id === productId ? { ...p, ...updates } : p
    );
    setProducts(updatedProducts);
    storageService.saveProducts(updatedProducts);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    storageService.saveProducts(updatedProducts);
  };

  const updateStock = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProduct(productId, { stock: product.stock + quantity });
    }
  };

  // Order functions
  const createOrder = (orderData) => {
    const newOrder = {
      id: uuidv4(),
      items: orderData.items,
      total: orderData.total,
      notes: orderData.notes || '',
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    storageService.saveOrders(updatedOrders);

    // Update stock
    orderData.items.forEach(item => {
      updateStock(item.productId, -item.quantity);
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map(o =>
      o.id === orderId ? { ...o, status } : o
    );
    setOrders(updatedOrders);
    storageService.saveOrders(updatedOrders);
  };

  // Queue functions (for async voice processing)
  const addToQueue = (item) => {
    if (queueItems.length >= 10) {
      throw new Error('Queue is full (max 10 items)');
    }

    const queueItem = {
      id: uuidv4(),
      ...item,
      status: 'processing',
      createdAt: new Date().toISOString()
    };

    setQueueItems(prev => [...prev, queueItem]);
    return queueItem;
  };

  const updateQueueItem = (itemId, updates) => {
    setQueueItems(prev =>
      prev.map(item => item.id === itemId ? { ...item, ...updates } : item)
    );
  };

  const removeFromQueue = (itemId) => {
    setQueueItems(prev => prev.filter(item => item.id !== itemId));
  };

  const confirmQueueItem = (itemId) => {
    const item = queueItems.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === QUEUE_ITEM_TYPE.ADD_PRODUCT) {
      addProduct(item.data);
    } else if (item.type === QUEUE_ITEM_TYPE.CREATE_ORDER) {
      createOrder(item.data);
    }

    removeFromQueue(itemId);
  };

  const confirmAllQueue = () => {
    queueItems.forEach(item => {
      if (item.type === QUEUE_ITEM_TYPE.ADD_PRODUCT) {
        addProduct(item.data);
      } else if (item.type === QUEUE_ITEM_TYPE.CREATE_ORDER) {
        createOrder(item.data);
      }
    });
    setQueueItems([]);
  };

  const clearQueue = () => {
    setQueueItems([]);
  };

  // Settings functions
  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storageService.saveSettings(updated);
  };

  const value = {
    // State
    products,
    orders,
    queueItems,
    settings,

    // Product functions
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,

    // Order functions
    createOrder,
    updateOrderStatus,

    // Queue functions
    addToQueue,
    updateQueueItem,
    removeFromQueue,
    confirmQueueItem,
    confirmAllQueue,
    clearQueue,

    // Settings functions
    updateSettings
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
