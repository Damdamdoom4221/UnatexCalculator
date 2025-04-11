import React, { createContext, useState, useContext, useEffect } from 'react';

const WindowContext = createContext();

const STORAGE_KEY = 'windowState';
const EXPIRATION_DAYS = 7;

const getStoredState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const { data, expiration } = JSON.parse(stored);
  if (Date.now() > expiration) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return data;
};

const setStoredState = (state) => {
  const expiration = Date.now() + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    data: state,
    expiration
  }));
};

const initialConfig = {
  dimensions: {
    width: 1000,
    height: 2000
  },
  form: 'rect',
  material: {
    id: 'ПВХ 700 микрон 1.4',
    name: 'ПВХ 700 микрон 1.4',
    code: 'PHR-55',
    manufacturer: 'Производство: Южная Корея',
    price: 960
  },
  border: {
    id: 'white',
    color: '#FFFFFF',
    pantone: 'Pantone RAL600',
    price: 960
  },
  fittings: {
    type: 'luvers_10mm',
    price: 44
  },
  settings: {
    crossbars: {
      enabled: {
        vertical: false,
        horizontal: false
      },
      vertical: 0,
      horizontal: 0
    },
    zipper: {
      color: '#000000',
      pantone: 'Pantone RAL600'
    },
    pocket: {
      position: null,
      dimensions: {
        width: 6,
        height: 3
      }
    },
    fittingsPosition: 'none'
  },
  price: 1964,
  progress: 0,
  id: null,
  createdAt: null,
  updatedAt: null
};

export function WindowProvider({ children }) {
  const storedState = getStoredState();
  
  // Создаем первое окно, если нет сохраненного состояния
  const firstWindow = {
    ...initialConfig,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const [config, setConfig] = useState(storedState?.config || firstWindow);
  const [windows, setWindows] = useState(storedState?.windows || [firstWindow]);
  const [cart, setCart] = useState(storedState?.cart || []);
  const [history, setHistory] = useState([]);

  // Сохраняем состояние при каждом изменении
  useEffect(() => {
    setStoredState({ config, windows, cart });
  }, [config, windows, cart]);

  // Функция создания нового окна
  const createNewWindow = () => {
    const newWindow = {
      ...config,  // Используем текущую конфигурацию как основу
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConfig(newWindow);
    setWindows(prev => [...prev, newWindow]);
    setHistory([]);
  };

  // Функция копирования окна
  const copyWindow = () => {
    const copiedWindow = {
      ...config,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setWindows(prev => [...prev, copiedWindow]);
    setConfig(copiedWindow);
  };

  // Функция добавления в корзину
  const addToCart = () => {
    if (config.progress >= 45) {
      setCart(prev => [...prev, { ...config }]);
      return true;
    }
    return false;
  };

  // Функция загрузки существующего окна
  const loadWindow = (windowId) => {
    const window = windows.find(w => w.id === windowId);
    if (window) {
      setConfig(window);
      setHistory([]);
    }
  };

  // Функция обновления конфигурации с сохранением истории
  const updateConfig = (newConfig) => {
    setHistory(prev => [...prev, config]);
    setConfig({
      ...newConfig,
      updatedAt: new Date().toISOString()
    });
    setWindows(prev => 
      prev.map(w => 
        w.id === newConfig.id 
          ? { ...newConfig, updatedAt: new Date().toISOString() }
          : w
      )
    );
  };

  // Функция отмены последнего изменения
  const undoLastChange = () => {
    if (history.length > 0) {
      const lastConfig = history[history.length - 1];
      setConfig(lastConfig);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  // Функция удаления из корзины
  const removeFromCart = (windowId) => {
    setCart(prev => prev.filter(item => item.id !== windowId));
  };

  const value = {
    config,
    setConfig: updateConfig,
    windows,
    cart,
    createNewWindow,
    copyWindow,
    addToCart,
    loadWindow,
    undoLastChange,
    removeFromCart,
    history
  };

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
} 