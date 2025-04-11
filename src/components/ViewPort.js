import React from 'react';
import styled from 'styled-components';
import { useWindow } from '../contexts/WindowContext';

const ViewPortContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
`;

const WindowCounter = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1;

  span {
    color: #333;
    font-weight: 500;
  }

  button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 18px;
    padding: 0 4px;
    
    &:hover {
      color: #0056b3;
    }
    
    &:disabled {
      color: #ccc;
      cursor: default;
    }
  }
`;

const WindowPreview = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RulerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const HorizontalRuler = styled.div`
  position: absolute;
  top: 0;
  left: 40px;
  right: 0;
  height: 40px;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  align-items: center;
`;

const VerticalRuler = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 40px;
  bottom: 0;
  background: #f8f9fa;
  border-right: 1px solid #e1e8ed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RulerMark = styled.div`
  position: absolute;
  ${props => props.vertical ? 'top' : 'left'}: ${props => props.position}px;
  ${props => props.vertical ? 'left' : 'top'}: 50%;
  transform: ${props => props.vertical ? 'translateY(-50%)' : 'translateX(-50%)'};
  font-size: 10px;
  color: #666;
`;

const WindowArea = styled.div`
  position: relative;
  margin: 40px 0 0 40px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  svg {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

const DimensionInput = styled.input`
  width: 80px;
  height: 30px;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 14px;
  text-align: center;
  margin: 0 5px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const DimensionLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const DimensionsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

// Функция для преобразования hex в rgb
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const shapes = {
  rect: '/elements/Viewport/Default.svg',
  trapezoid1: '/elements/Viewport/Property 1=Variant2.svg',
  trapezoid2: '/elements/Viewport/Property 1=Variant3.svg',
  octagon: '/elements/Viewport/Property 1=Variant4.svg',
  trapezoid3: '/elements/Viewport/Property 1=Variant5.svg',
  trapezoid4: '/elements/Viewport/Property 1=Variant6.svg',
  house: '/elements/Viewport/Property 1=Variant7.svg',
  triangle1: '/elements/Viewport/Property 1=Variant8.svg',
  triangle2: '/elements/Viewport/Property 1=Variant9.svg',
  triangle3: '/elements/Viewport/Property 1=Variant10.svg',
  polygon1: '/elements/Viewport/Property 1=Variant11.svg',
  polygon2: '/elements/Viewport/Property 1=Variant12.svg',
  tshape1: '/elements/Viewport/Property 1=Variant13.svg',
  tshape2: '/elements/Viewport/Property 1=Variant14.svg',
  tshape3: '/elements/Viewport/Property 1=Variant15.svg'
};

function ViewPort() {
  const { config, setConfig, windows } = useWindow();
  const { width, height } = config.dimensions;
  
  // Находим индекс текущего окна
  const currentWindowIndex = windows.findIndex(w => w.id === config.id) + 1;
  const totalWindows = windows.length;

  // Функция для навигации между окнами
  const navigateWindow = (direction) => {
    const newIndex = currentWindowIndex + direction - 1; // -1 потому что currentWindowIndex начинается с 1
    if (newIndex >= 0 && newIndex < windows.length) {
      setConfig(windows[newIndex]);
    }
  };

  // Обработчики изменения размеров
  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value);
    if (!isNaN(newWidth)) {
      setConfig({
        ...config,
        dimensions: {
          ...config.dimensions,
          width: Math.min(Math.max(newWidth, 400), 3000)
        },
        progress: Math.min(45, config.progress + 1)
      });
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value);
    if (!isNaN(newHeight)) {
      setConfig({
        ...config,
        dimensions: {
          ...config.dimensions,
          height: Math.min(Math.max(newHeight, 400), 3000)
        },
        progress: Math.min(45, config.progress + 1)
      });
    }
  };

  // Создание меток для линеек
  const rulerMarks = {
    horizontal: [],
    vertical: []
  };

  // Создаем метки каждые 100 мм
  for (let i = 0; i <= width; i += 100) {
    rulerMarks.horizontal.push(
      <RulerMark key={`h${i}`} position={i * 0.1}>
        {i}
      </RulerMark>
    );
  }

  for (let i = 0; i <= height; i += 100) {
    rulerMarks.vertical.push(
      <RulerMark key={`v${i}`} vertical position={i * 0.1}>
        {i}
      </RulerMark>
    );
  }

  // Вычисляем размеры SVG
  const scale = 0.1; // 1mm = 0.1px
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  return (
    <ViewPortContainer>
      <WindowCounter>
        <button 
          onClick={() => navigateWindow(-1)}
          disabled={currentWindowIndex <= 1}
        >
          ‹
        </button>
        <span>{currentWindowIndex}/{totalWindows}</span>
        <button 
          onClick={() => navigateWindow(1)}
          disabled={currentWindowIndex >= totalWindows}
        >
          ›
        </button>
      </WindowCounter>

      <DimensionsContainer>
        <div>
          <DimensionLabel>Ширина:</DimensionLabel>
          <DimensionInput
            type="number"
            value={width}
            onChange={handleWidthChange}
            min={400}
            max={3000}
          />
          <DimensionLabel>мм</DimensionLabel>
        </div>
        <div>
          <DimensionLabel>Высота:</DimensionLabel>
          <DimensionInput
            type="number"
            value={height}
            onChange={handleHeightChange}
            min={400}
            max={3000}
          />
          <DimensionLabel>мм</DimensionLabel>
        </div>
      </DimensionsContainer>

      <WindowPreview>
        <RulerContainer>
          <HorizontalRuler>
            {rulerMarks.horizontal}
          </HorizontalRuler>
          <VerticalRuler>
            {rulerMarks.vertical}
          </VerticalRuler>
          <WindowArea>
            <svg 
              width={scaledWidth} 
              height={scaledHeight}
              viewBox={`0 0 ${scaledWidth} ${scaledHeight}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="recolor">
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0
                            0 0 0 0 0
                            0 0 0 0 0
                            0 0 0 1 0"
                  />
                  {config.border?.color && (() => {
                    const rgb = hexToRgb(config.border.color);
                    return (
                      <feFlood
                        floodColor={`rgb(${rgb.r},${rgb.g},${rgb.b})`}
                        result="flood"
                      />
                    );
                  })()}
                  <feComposite
                    in="flood"
                    in2="SourceAlpha"
                    operator="in"
                    result="comp"
                  />
                  <feMerge>
                    <feMergeNode in="comp"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Основная форма окна */}
              <use
                href={`${shapes[config.form || 'rect']}#window`}
                width={scaledWidth}
                height={scaledHeight}
                style={{
                  filter: config.border?.color ? 'url(#recolor)' : 'none'
                }}
              />
            </svg>
          </WindowArea>
        </RulerContainer>
      </WindowPreview>
    </ViewPortContainer>
  );
}

export default ViewPort; 