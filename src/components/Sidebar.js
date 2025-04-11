import React, { useState } from 'react';
import styled from 'styled-components';
import { useWindow } from '../contexts/WindowContext';

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f9fa;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 20px;
  gap: 5px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  background: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#000000'};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#007bff' : '#e9ecef'};
  }
`;

const MaterialCard = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid #000000'};
  border-radius: 2px;
  margin-bottom: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const MaterialPreview = styled.div`
  width: 60px;
  height: 60px;
  background-color: #87CEEB;
  border-right: 1px solid #000000;
  flex-shrink: 0;
`;

const MaterialInfo = styled.div`
  flex-grow: 1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MaterialName = styled.div`
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #000000;
`;

const MaterialCode = styled.div`
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #666666;
`;

const MaterialManufacturer = styled.div`
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #666666;
`;

const MaterialPrice = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #000000;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
  background-color: ${props => props.primary ? '#007bff' : '#ffffff'};
  color: ${props => props.primary ? '#ffffff' : '#007bff'};
  border: ${props => props.primary ? 'none' : '1px solid #007bff'};
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding: 16px;
`;

const FormShape = styled.div`
  width: 90px;
  height: 90px;
  background-color: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid #000000'};
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  img {
    padding: 16px;
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`;

const BorderCard = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  background: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const BorderPreview = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.color};
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const BorderInfo = styled.div`
  flex-grow: 1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BorderName = styled.div`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 2px;
`;

const BorderPantone = styled.div`
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #666666;
`;

const BorderPrice = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #000000;
  white-space: nowrap;
`;

const ActionButton = styled.button`
  flex: 1;
  height: 40px;
  padding: 0 16px;
  background: ${props => props.primary ? '#007bff' : '#ffffff'};
  color: ${props => props.primary ? '#ffffff' : '#007bff'};
  border: 1px solid #007bff;
  border-radius: 8px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => props.primary ? '#0056b3' : '#e9ecef'};
  }
`;

const borderColors = [
  { id: 'brown1', name: 'Коричневый', pantone: 'Pantone RAL600', price: 960, color: '#8B4513' },
  { id: 'beige', name: 'Бежевый', pantone: 'Pantone RAL600', price: 960, color: '#F5F5DC' },
  { id: 'white', name: 'Белый', pantone: 'Pantone RAL600', price: 960, color: '#FFFFFF' },
  { id: 'gray', name: 'Серый', pantone: 'Pantone RAL600', price: 960, color: '#808080' },
  { id: 'red', name: 'Красный', pantone: 'Pantone RAL600', price: 960, color: '#FF0000' },
  { id: 'green', name: 'Зелёный', pantone: 'Pantone RAL600', price: 960, color: '#008000' },
  { id: 'blue', name: 'Синий', pantone: 'Pantone RAL600', price: 960, color: '#0000FF' },
  { id: 'burgundy', name: 'Бордовый', pantone: 'Pantone RAL600', price: 960, color: '#800000' },
  { id: 'black', name: 'Чёрный', pantone: 'Pantone RAL600', price: 960, color: '#000000' },
  { id: 'brown2', name: 'Коричневый', pantone: 'Pantone RAL600', price: 960, color: '#8B4513' }
];

const shapes = [
  { id: 'rect', path: '/elements/Active window frame.svg' },
  { id: 'trapezoid1', path: '/elements/Active window frame-1.svg' },
  { id: 'trapezoid2', path: '/elements/Active window frame-2.svg' },
  { id: 'octagon', path: '/elements/Active window frame-3.svg' },
  { id: 'trapezoid3', path: '/elements/Active window frame-4.svg' },
  { id: 'trapezoid4', path: '/elements/Active window frame-5.svg' },
  { id: 'house', path: '/elements/Active window frame-6.svg' },
  { id: 'triangle1', path: '/elements/Active window frame-7.svg' },
  { id: 'triangle2', path: '/elements/Active window frame-8.svg' },
  { id: 'triangle3', path: '/elements/Active window frame-9.svg' },
  { id: 'polygon1', path: '/elements/Active window frame-10.svg' },
  { id: 'polygon2', path: '/elements/Active window frame-11.svg' },
  { id: 'tshape1', path: '/elements/Active window frame-12.svg' },
  { id: 'tshape2', path: '/elements/Active window frame-13.svg' },
  { id: 'tshape3', path: '/elements/Active window frame-14.svg' }
];

const materials = [
  {
    id: 'ПВХ 700 микрон 1.4',
    name: 'ПВХ 700 микрон 1.4',
    code: 'PHR-55',
    manufacturer: 'Производство: Южная Корея',
    price: 960
  },
  {
    id: 'ПВХ 700 микрон 2.4',
    name: 'ПВХ 700 микрон 2.4',
    code: 'PHR-55',
    manufacturer: 'Производство: Южная Корея',
    price: 1180
  },
  {
    id: 'ТПУ 700 микрон',
    name: 'ТПУ 700 микрон',
    code: '',
    manufacturer: 'Для суровых климатических условий',
    price: 2420
  },
  {
    id: 'ПВХ 700 тонированная',
    name: 'ПВХ 700 тонированная',
    code: 'PHR-55',
    manufacturer: '',
    price: 1310
  },
  {
    id: 'Москитная сетка',
    name: 'Москитная сетка',
    code: 'PHR-55',
    manufacturer: 'Производство: Южная Корея',
    price: 1364
  },
  {
    id: 'ПВХ 650 грамм',
    name: 'ПВХ 650 грамм',
    code: '',
    manufacturer: 'Непрозрачный тент из армированный ПВХ',
    price: 940
  }
];

const FittingCard = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  background: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const FittingPreview = styled.div`
  width: 48px;
  height: 48px;
  background-color: #87CEEB;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const FittingInfo = styled.div`
  flex-grow: 1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FittingName = styled.div`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 2px;
`;

const FittingDescription = styled.div`
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #666666;
`;

const FittingPrice = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #000000;
  white-space: nowrap;
`;

const fittings = [
  { 
    id: 'luvers_10mm',
    name: 'Люверс 10 мм',
    description: 'Металлические крепления для установки креплений',
    price: 44
  },
  {
    id: 'skoba',
    name: 'Скоба с ремешком',
    description: 'Крепления на мягких окнах из ПВХ',
    price: 44
  },
  {
    id: 'povorotnaya_metal',
    name: 'Поворотная металлическая',
    description: 'Надёжное крепление',
    price: 44
  },
  {
    id: 'povorotnaya_plastic',
    name: 'Поворотная пластиковая',
    description: 'Крепление из ПВХ',
    price: 44
  },
  {
    id: 'french_lock',
    name: 'Французский замок',
    description: 'Стальные крепления мягких окон',
    price: 44
  }
];

const SettingsSection = styled.div`
  margin-top: 20px;
`;

const SettingsTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: #000000;
  margin-bottom: 5px;
`;

const SettingsDescription = styled.p`
  font-size: 12px;
  color: #666666;
  font-family: Arial, sans-serif;
  margin-bottom: 16px;
`;

const CrossbarSection = styled.div`
  margin-top: 20px;
`;

const CrossbarTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: #000000;
  margin-bottom: 10px;
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const CrossbarPreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ZipperSection = styled.div`
  margin-top: 20px;
`;

const ZipperTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: #000000;
  margin-bottom: 10px;
`;

const ZipperColorCard = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  background: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ZipperColorPreview = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.color};
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const ZipperColorInfo = styled.div`
  flex: 1;
  padding: 8px 12px;
`;

const ZipperColorName = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-family: Arial, sans-serif;
  color: #000000;
`;

const ZipperColorPantone = styled.div`
  font-size: 12px;
  color: #666666;
  font-family: Arial, sans-serif;
`;

const zipperColors = [
  { id: 'black', name: 'Чёрный', color: '#000000', pantone: 'Pantone RAL600' },
  { id: 'white', name: 'Белый', color: '#FFFFFF', pantone: 'Pantone RAL600' }
];

const ToggleButton = styled.button`
  flex: 1;
  height: 40px;
  background: ${props => props.active ? '#007bff' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#000000'};
  border: 1px solid ${props => props.active ? '#007bff' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#007bff' : '#e9ecef'};
  }
`;

const CrossbarPreview = styled.div`
  width: 60px;
  height: 60px;
  background: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const PocketSection = styled.div`
  margin-top: 20px;
`;

const PocketTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: #000000;
  margin-bottom: 10px;
`;

const PocketPreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PocketPreview = styled.div`
  width: 60px;
  height: 60px;
  background: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const DimensionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const DimensionInput = styled.input`
  width: 60px;
  height: 30px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  text-align: center;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const FittingsPreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const FittingsPreview = styled.div`
  width: 60px;
  height: 60px;
  background: #ffffff;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ErrorMessage = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
  border-radius: 4px;
  font-size: 14px;
  font-family: Arial, sans-serif;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

function Sidebar() {
  const [activeTab, setActiveTab] = useState('Форма');
  const { 
    config, 
    setConfig, 
    createNewWindow, 
    copyWindow, 
    addToCart, 
    undoLastChange,
    history,
    windows 
  } = useWindow();
  const [error, setError] = useState(null);
  
  const tabs = ['Форма', 'Материал', 'Окантовка', 'Фурнитура', 'Настройки', 'Установка'];

  // Валидация конфигурации
  const validateConfig = () => {
    if (!config.form) {
      setError('Выберите форму окна');
      return false;
    }
    if (!config.material.id) {
      setError('Выберите материал');
      return false;
    }
    if (!config.border.id) {
      setError('Выберите окантовку');
      return false;
    }
    if (!config.fittings.type) {
      setError('Выберите фурнитуру');
      return false;
    }
    if (config.settings.pocket.position && 
        (config.settings.pocket.dimensions.width < 3 || 
         config.settings.pocket.dimensions.width > 18 ||
         config.settings.pocket.dimensions.height < 3 || 
         config.settings.pocket.dimensions.height > 18)) {
      setError('Размеры кармана должны быть от 3 до 18');
      return false;
    }
    setError(null);
    return true;
  };

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (validateConfig()) {
      if (addToCart()) {
        setError('Окно успешно добавлено в корзину');
      } else {
        setError('Заполните все необходимые параметры');
      }
    }
  };

  // Обработчик создания нового окна
  const handleNewWindow = () => {
    createNewWindow();
    setActiveTab('Форма');
  };

  // Обработчик копирования окна
  const handleCopyWindow = () => {
    if (validateConfig()) {
      copyWindow();
      setError('Окно успешно скопировано');
    }
  };

  // Обработчик отмены последнего действия
  const handleUndo = () => {
    if (history.length > 0) {
      undoLastChange();
    }
  };

  const handleMaterialSelect = (material) => {
    const oldMaterialPrice = config.material.price;
    setConfig({
      ...config,
      material: material,
      price: config.price - oldMaterialPrice + material.price,
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleShapeSelect = (shape) => {
    setConfig({
      ...config,
      form: shape,
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleBorderSelect = (border) => {
    const oldBorderPrice = config.border.price;
    setConfig({
      ...config,
      border: {
        id: border.id,
        color: border.color,
        pantone: border.pantone,
        price: border.price
      },
      price: config.price - oldBorderPrice + border.price,
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleFittingSelect = (fitting) => {
    const oldFittingPrice = config.fittings.price || 0;
    setConfig({
      ...config,
      fittings: {
        ...config.fittings,
        type: fitting.id,
        price: fitting.price
      },
      price: config.price - oldFittingPrice + fitting.price,
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleCrossbarToggle = (type) => {
    setConfig({
      ...config,
      settings: {
        ...config.settings,
        crossbars: {
          ...config.settings.crossbars,
          enabled: {
            ...config.settings.crossbars.enabled,
            [type]: !config.settings.crossbars.enabled[type]
          },
          [type]: config.settings.crossbars.enabled[type] ? 0 : 1
        }
      },
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleCrossbarCountSelect = (type, count) => {
    setConfig({
      ...config,
      settings: {
        ...config.settings,
        crossbars: {
          ...config.settings.crossbars,
          [type]: count
        }
      },
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleZipperColorSelect = (color) => {
    setConfig({
      ...config,
      settings: {
        ...config.settings,
        zipper: {
          color: color.color,
          pantone: color.pantone
        }
      },
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handlePocketSelect = (position) => {
    setConfig({
      ...config,
      settings: {
        ...config.settings,
        pocket: {
          ...config.settings.pocket,
          position
        }
      },
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handlePocketDimensions = (dimension, value) => {
    const numValue = parseInt(value);
    
    // Разрешаем пустое значение при вводе
    if (value === '') {
      setConfig({
        ...config,
        settings: {
          ...config.settings,
          pocket: {
            ...config.settings.pocket,
            dimensions: {
              ...config.settings.pocket.dimensions,
              [dimension]: 3
            }
          }
        }
      });
      return;
    }

    // Проверяем, является ли значение числом
    if (isNaN(numValue)) return;

    setConfig({
      ...config,
      settings: {
        ...config.settings,
        pocket: {
          ...config.settings.pocket,
          dimensions: {
            ...config.settings.pocket.dimensions,
            [dimension]: Math.min(Math.max(numValue, 3), 18)
          }
        }
      },
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleConfirmSettings = () => {
    setConfig({
      ...config,
      progress: Math.min(45, config.progress + 1)
    });
  };

  const handleFittingsPositionSelect = (position) => {
    setConfig({
      ...config,
      settings: {
        ...config.settings,
        fittingsPosition: position
      },
      progress: Math.min(45, config.progress + 1)
    });
  };

  return (
    <SidebarContainer>
      <TabsContainer>
        {tabs.map(tab => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabsContainer>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {activeTab === 'Форма' && (
        <>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            fontFamily: 'Arial, sans-serif', 
            marginBottom: '5px' 
          }}>
            Форма мягкого окна
          </h3>
          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginBottom: '20px' 
          }}>
            Нажмите на подходящую фигуру. В дальнейшем вы сможете добавить вырезы
          </p>

          <FormGrid>
            {shapes.map(shape => (
              <FormShape
                key={shape.id}
                selected={config.form === shape.id}
                onClick={() => handleShapeSelect(shape.id)}
              >
                <img src={shape.path} alt={shape.id} />
              </FormShape>
            ))}
          </FormGrid>

          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginTop: '20px' 
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </>
      )}

      {activeTab === 'Материал' && (
        <>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            fontFamily: 'Arial, sans-serif', 
            marginBottom: '5px' 
          }}>
            Материал мягкого окна
          </h3>
          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginBottom: '20px' 
          }}>
            Выберите материал, который вам необходим
          </p>

          {materials.map(material => (
            <MaterialCard
              key={material.id}
              selected={config.material.id === material.id}
              onClick={() => handleMaterialSelect(material)}
            >
              <MaterialPreview />
              <MaterialInfo>
                <MaterialName>{material.name}</MaterialName>
                {material.code && <MaterialCode>{material.code}</MaterialCode>}
                {material.manufacturer && (
                  <MaterialManufacturer>{material.manufacturer}</MaterialManufacturer>
                )}
              </MaterialInfo>
              <MaterialPrice>+{material.price} ₽</MaterialPrice>
            </MaterialCard>
          ))}

          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginTop: '20px' 
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </>
      )}

      {activeTab === 'Окантовка' && (
        <>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            marginBottom: '5px' 
          }}>
            Цвет окантовки мягкого окна
          </h3>
          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginBottom: '16px' 
          }}>
            Нажмите на цвет, который подойдёт под интерьер
          </p>

          {borderColors.map(border => (
            <BorderCard
              key={border.id}
              selected={config.border.id === border.id}
              onClick={() => handleBorderSelect(border)}
            >
              <BorderPreview color={border.color} />
              <BorderInfo>
                <BorderName>{border.name}</BorderName>
                <BorderPantone>{border.pantone}</BorderPantone>
              </BorderInfo>
              <BorderPrice>+{border.price} ₽</BorderPrice>
            </BorderCard>
          ))}

          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginTop: '20px',
            lineHeight: '1.5'
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </>
      )}

      {activeTab === 'Фурнитура' && (
        <div>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            marginBottom: '5px' 
          }}>
            Подбор фурнитуры и креплений
          </h3>
          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginBottom: '16px' 
          }}>
            Нажмите на подходящую фурнитуру. В дальнейшем вы сможете добавить вырезы
          </p>

          {fittings.map(fitting => (
            <FittingCard
              key={fitting.id}
              selected={config.fittings.type === fitting.id}
              onClick={() => handleFittingSelect(fitting)}
            >
              <FittingPreview />
              <FittingInfo>
                <FittingName>{fitting.name}</FittingName>
                <FittingDescription>{fitting.description}</FittingDescription>
              </FittingInfo>
              <FittingPrice>+{fitting.price} ₽</FittingPrice>
            </FittingCard>
          ))}

          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginTop: '20px',
            lineHeight: '1.5'
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      )}

      {activeTab === 'Настройки' && (
        <SettingsSection>
          <SettingsTitle>
            Дополнительные настройки окна
          </SettingsTitle>
          <SettingsDescription>
            Выберите интересующие параметры
          </SettingsDescription>

          <CrossbarSection>
            <CrossbarTitle>
              Вертикальные перемычки (ШхВ)
            </CrossbarTitle>
            <ToggleContainer>
              <ToggleButton
                active={!config.settings.crossbars.enabled.vertical}
                onClick={() => handleCrossbarToggle('vertical')}
              >
                Нет
              </ToggleButton>
              <ToggleButton
                active={config.settings.crossbars.enabled.vertical}
                onClick={() => handleCrossbarToggle('vertical')}
              >
                Да
              </ToggleButton>
            </ToggleContainer>

            {config.settings.crossbars.enabled.vertical && (
              <CrossbarPreviewContainer>
                <CrossbarPreview
                  selected={config.settings.crossbars.vertical === 1}
                  onClick={() => handleCrossbarCountSelect('vertical', 1)}
                >
                  <svg width="60" height="60">
                    <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                    <line x1="30" y1="5" x2="30" y2="55" stroke="#000000" strokeWidth="1" />
                  </svg>
                </CrossbarPreview>
                <CrossbarPreview
                  selected={config.settings.crossbars.vertical === 2}
                  onClick={() => handleCrossbarCountSelect('vertical', 2)}
                >
                  <svg width="60" height="60">
                    <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                    <line x1="20" y1="5" x2="20" y2="55" stroke="#000000" strokeWidth="1" />
                    <line x1="40" y1="5" x2="40" y2="55" stroke="#000000" strokeWidth="1" />
                  </svg>
                </CrossbarPreview>
              </CrossbarPreviewContainer>
            )}
          </CrossbarSection>

          <CrossbarSection>
            <CrossbarTitle>
              Добавить перемычку по ширине
            </CrossbarTitle>
            <ToggleContainer>
              <ToggleButton
                active={!config.settings.crossbars.enabled.horizontal}
                onClick={() => handleCrossbarToggle('horizontal')}
              >
                Нет
              </ToggleButton>
              <ToggleButton
                active={config.settings.crossbars.enabled.horizontal}
                onClick={() => handleCrossbarToggle('horizontal')}
              >
                Да
              </ToggleButton>
            </ToggleContainer>

            {config.settings.crossbars.enabled.horizontal && (
              <CrossbarPreviewContainer>
                <CrossbarPreview
                  selected={config.settings.crossbars.horizontal === 1}
                  onClick={() => handleCrossbarCountSelect('horizontal', 1)}
                >
                  <svg width="60" height="60">
                    <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                    <line x1="5" y1="30" x2="55" y2="30" stroke="#000000" strokeWidth="1" />
                  </svg>
                </CrossbarPreview>
                <CrossbarPreview
                  selected={config.settings.crossbars.horizontal === 2}
                  onClick={() => handleCrossbarCountSelect('horizontal', 2)}
                >
                  <svg width="60" height="60">
                    <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                    <line x1="5" y1="20" x2="55" y2="20" stroke="#000000" strokeWidth="1" />
                    <line x1="5" y1="40" x2="55" y2="40" stroke="#000000" strokeWidth="1" />
                  </svg>
                </CrossbarPreview>
              </CrossbarPreviewContainer>
            )}
          </CrossbarSection>

          <ZipperSection>
            <ZipperTitle>
              Выберите цвет молнии
            </ZipperTitle>
            {zipperColors.map(color => (
              <ZipperColorCard
                key={color.id}
                selected={config.settings.zipper.color === color.color}
                onClick={() => handleZipperColorSelect(color)}
              >
                <ZipperColorPreview color={color.color} />
                <ZipperColorInfo>
                  <ZipperColorName>{color.name}</ZipperColorName>
                  <ZipperColorPantone>{color.pantone}</ZipperColorPantone>
                </ZipperColorInfo>
              </ZipperColorCard>
            ))}
          </ZipperSection>

          <PocketSection>
            <PocketTitle>
              Выберите вариант выреза
            </PocketTitle>
            <PocketPreviewContainer>
              <PocketPreview
                selected={config.settings.pocket.position === 'top-left'}
                onClick={() => handlePocketSelect('top-left')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  <rect x="5" y="5" width="20" height="10" fill="#333333" />
                </svg>
              </PocketPreview>
              <PocketPreview
                selected={config.settings.pocket.position === 'bottom-left'}
                onClick={() => handlePocketSelect('bottom-left')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  <rect x="5" y="45" width="20" height="10" fill="#333333" />
                </svg>
              </PocketPreview>
              <PocketPreview
                selected={config.settings.pocket.position === 'bottom-right'}
                onClick={() => handlePocketSelect('bottom-right')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  <rect x="35" y="45" width="20" height="10" fill="#333333" />
                </svg>
              </PocketPreview>
            </PocketPreviewContainer>
          </PocketSection>

          {config.settings.pocket.position && (
            <PocketSection>
              <PocketTitle>
                Выберите размер выреза (ШхВ)
              </PocketTitle>
              <DimensionsContainer>
                <DimensionInput
                  type="number"
                  min="3"
                  max="18"
                  value={config.settings.pocket.dimensions.width}
                  onChange={(e) => handlePocketDimensions('width', e.target.value)}
                  placeholder="Ш"
                />
                <DimensionInput
                  type="number"
                  min="3"
                  max="18"
                  value={config.settings.pocket.dimensions.height}
                  onChange={(e) => handlePocketDimensions('height', e.target.value)}
                  placeholder="В"
                />
              </DimensionsContainer>
            </PocketSection>
          )}

          <ActionButton primary onClick={handleConfirmSettings}>
            Подтвердить выбранные параметры
          </ActionButton>

          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginTop: '20px',
            lineHeight: '1.5'
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </SettingsSection>
      )}

      {activeTab === 'Установка' && (
        <SettingsSection>
          <SettingsTitle>
            Выберите расположение креплений
          </SettingsTitle>
          <SettingsDescription>
            Подберите вариант установки, подходящий по вашему усмотрению
          </SettingsDescription>

          <CrossbarSection>
            <CrossbarTitle>
              Заменим крепления сверху на люверс
            </CrossbarTitle>
            <SettingsDescription>
              + 44 ₽
            </SettingsDescription>
          </CrossbarSection>

          <CrossbarSection>
            <CrossbarTitle>
              Укажите положение крепежа
            </CrossbarTitle>
            <FittingsPreviewContainer>
              <FittingsPreview
                selected={config.settings.fittingsPosition === 'none'}
                onClick={() => handleFittingsPositionSelect('none')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                </svg>
              </FittingsPreview>
              <FittingsPreview
                selected={config.settings.fittingsPosition === 'top'}
                onClick={() => handleFittingsPositionSelect('top')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  <circle cx="15" cy="10" r="2" fill="#000000" />
                  <circle cx="25" cy="10" r="2" fill="#000000" />
                  <circle cx="35" cy="10" r="2" fill="#000000" />
                  <circle cx="45" cy="10" r="2" fill="#000000" />
                </svg>
              </FittingsPreview>
              <FittingsPreview
                selected={config.settings.fittingsPosition === 'top-and-sides'}
                onClick={() => handleFittingsPositionSelect('top-and-sides')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  <circle cx="15" cy="10" r="2" fill="#000000" />
                  <circle cx="25" cy="10" r="2" fill="#000000" />
                  <circle cx="35" cy="10" r="2" fill="#000000" />
                  <circle cx="45" cy="10" r="2" fill="#000000" />
                  <circle cx="10" cy="30" r="2" fill="#000000" />
                  <circle cx="50" cy="30" r="2" fill="#000000" />
                </svg>
              </FittingsPreview>
              <FittingsPreview
                selected={config.settings.fittingsPosition === 'sides'}
                onClick={() => handleFittingsPositionSelect('sides')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  <circle cx="10" cy="20" r="2" fill="#000000" />
                  <circle cx="10" cy="40" r="2" fill="#000000" />
                  <circle cx="50" cy="20" r="2" fill="#000000" />
                  <circle cx="50" cy="40" r="2" fill="#000000" />
                </svg>
              </FittingsPreview>
              <FittingsPreview
                selected={config.settings.fittingsPosition === 'top-and-sides-screw'}
                onClick={() => handleFittingsPositionSelect('top-and-sides-screw')}
              >
                <svg viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  <circle cx="15" cy="10" r="2" fill="#000000" />
                  <circle cx="25" cy="10" r="2" fill="#000000" />
                  <circle cx="35" cy="10" r="2" fill="#000000" />
                  <circle cx="45" cy="10" r="2" fill="#000000" />
                  <circle cx="10" cy="30" r="2" fill="#000000" />
                  <circle cx="50" cy="30" r="2" fill="#000000" />
                  <path d="M8,28 L12,32 M12,28 L8,32" stroke="#000000" strokeWidth="1" />
                  <path d="M48,28 L52,32 M52,28 L48,32" stroke="#000000" strokeWidth="1" />
                </svg>
              </FittingsPreview>
            </FittingsPreviewContainer>
          </CrossbarSection>

          <ActionButton primary onClick={() => handleFittingsPositionSelect(config.settings.fittingsPosition)}>
            Подтвердить выбранные параметры
          </ActionButton>

          <p style={{ 
            fontSize: '12px', 
            color: '#666666', 
            fontFamily: 'Arial, sans-serif', 
            marginTop: '20px',
            lineHeight: '1.5'
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </SettingsSection>
      )}

      <ActionButtonsContainer>
        <ActionButton primary onClick={handleNewWindow}>
          Новое окно
        </ActionButton>
        <ActionButton onClick={handleCopyWindow}>
          Копировать окно
        </ActionButton>
        <ActionButton onClick={handleAddToCart}>
          Корзина
        </ActionButton>
      </ActionButtonsContainer>
    </SidebarContainer>
  );
}

export default Sidebar; 