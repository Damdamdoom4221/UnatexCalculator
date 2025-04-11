import React from 'react';
import styled from 'styled-components';
import { useWindow } from '../contexts/WindowContext';

const CanvasContainer = styled.div`
  position: relative;
  margin: 20px;
`;

const WindowSvg = styled.svg`
  border: 1px solid #e1e8ed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const fittingShapes = {
  luvers_10mm: (x, y) => (
    <circle cx={x} cy={y} r="5" fill="#000000" />
  ),
  skoba: (x, y) => (
    <rect x={x - 5} y={y - 5} width="10" height="10" fill="#000000" />
  ),
  povorotnaya_metal: (x, y) => (
    <polygon points={`${x},${y-5} ${x+5},${y+5} ${x-5},${y+5}`} fill="#000000" />
  ),
  povorotnaya_plastic: (x, y) => (
    <polygon points={`${x},${y-5} ${x+5},${y+5} ${x-5},${y+5}`} fill="#666666" />
  ),
  french_lock: (x, y) => (
    <polygon points={`${x},${y-5} ${x+5},${y} ${x},${y+5} ${x-5},${y}`} fill="#000000" />
  )
};

function WindowCanvas() {
  const { config } = useWindow();
  const { width, height } = config.dimensions;
  const scale = 0.1;
  
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  // Calculate positions for fittings
  const fittingPositions = [];
  const margin = 20;
  const spacing = (scaledWidth - 2 * margin) / 7;
  
  for (let i = 0; i < 8; i++) {
    fittingPositions.push({
      x: margin + i * spacing,
      y: margin
    });
  }

  const renderFitting = (x, y) => {
    const fittingType = config.fittings.type || 'luvers_10mm';
    return fittingShapes[fittingType](x, y);
  };

  const renderFittings = () => {
    const elements = [];
    const scaledWidth = width / 10;
    const scaledHeight = height / 10;
    const margin = 20;

    switch (config.settings.fittingsPosition) {
      case 'top':
        // 4 люверса сверху
        elements.push(
          <g key="top-fittings">
            <circle cx={margin} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth / 3} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth * 2 / 3} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth - margin} cy={margin} r="5" fill="#000000" />
          </g>
        );
        break;

      case 'top-and-sides':
        // 4 люверса сверху и 2 по бокам
        elements.push(
          <g key="top-and-sides-fittings">
            <circle cx={margin} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth / 3} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth * 2 / 3} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth - margin} cy={margin} r="5" fill="#000000" />
            <circle cx={margin} cy={scaledHeight / 2} r="5" fill="#000000" />
            <circle cx={scaledWidth - margin} cy={scaledHeight / 2} r="5" fill="#000000" />
          </g>
        );
        break;

      case 'sides':
        // 4 люверса по бокам
        elements.push(
          <g key="sides-fittings">
            <circle cx={margin} cy={scaledHeight / 3} r="5" fill="#000000" />
            <circle cx={margin} cy={scaledHeight * 2 / 3} r="5" fill="#000000" />
            <circle cx={scaledWidth - margin} cy={scaledHeight / 3} r="5" fill="#000000" />
            <circle cx={scaledWidth - margin} cy={scaledHeight * 2 / 3} r="5" fill="#000000" />
          </g>
        );
        break;

      case 'top-and-sides-screw':
        // 4 люверса сверху, 2 по бокам и иконки саморезов
        elements.push(
          <g key="top-and-sides-screw-fittings">
            <circle cx={margin} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth / 3} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth * 2 / 3} cy={margin} r="5" fill="#000000" />
            <circle cx={scaledWidth - margin} cy={margin} r="5" fill="#000000" />
            <circle cx={margin} cy={scaledHeight / 2} r="5" fill="#000000" />
            <circle cx={scaledWidth - margin} cy={scaledHeight / 2} r="5" fill="#000000" />
            <path d={`M${margin-5},${scaledHeight/2-5} L${margin+5},${scaledHeight/2+5} M${margin+5},${scaledHeight/2-5} L${margin-5},${scaledHeight/2+5}`} stroke="#000000" strokeWidth="2" />
            <path d={`M${scaledWidth-margin-5},${scaledHeight/2-5} L${scaledWidth-margin+5},${scaledHeight/2+5} M${scaledWidth-margin+5},${scaledHeight/2-5} L${scaledWidth-margin-5},${scaledHeight/2+5}`} stroke="#000000" strokeWidth="2" />
          </g>
        );
        break;
    }

    return elements;
  };

  const renderCrossbars = () => {
    const elements = [];
    const scaledWidth = width / 10;
    const scaledHeight = height / 10;

    // Вертикальные перемычки
    if (config.settings.crossbars.enabled.vertical) {
      if (config.settings.crossbars.vertical === 1) {
        elements.push(
          <line
            key="vertical-1"
            x1={scaledWidth / 2}
            y1="0"
            x2={scaledWidth / 2}
            y2={scaledHeight}
            stroke="#000000"
            strokeWidth="2"
          />
        );
      } else if (config.settings.crossbars.vertical === 2) {
        elements.push(
          <>
            <line
              key="vertical-1"
              x1={scaledWidth / 3}
              y1="0"
              x2={scaledWidth / 3}
              y2={scaledHeight}
              stroke="#000000"
              strokeWidth="2"
            />
            <line
              key="vertical-2"
              x1={scaledWidth * 2 / 3}
              y1="0"
              x2={scaledWidth * 2 / 3}
              y2={scaledHeight}
              stroke="#000000"
              strokeWidth="2"
            />
          </>
        );
      }
    }

    // Горизонтальные перемычки
    if (config.settings.crossbars.enabled.horizontal) {
      if (config.settings.crossbars.horizontal === 1) {
        elements.push(
          <line
            key="horizontal-1"
            x1="0"
            y1={scaledHeight / 2}
            x2={scaledWidth}
            y2={scaledHeight / 2}
            stroke="#000000"
            strokeWidth="2"
          />
        );
      } else if (config.settings.crossbars.horizontal === 2) {
        elements.push(
          <>
            <line
              key="horizontal-1"
              x1="0"
              y1={scaledHeight / 3}
              x2={scaledWidth}
              y2={scaledHeight / 3}
              stroke="#000000"
              strokeWidth="2"
            />
            <line
              key="horizontal-2"
              x1="0"
              y1={scaledHeight * 2 / 3}
              x2={scaledWidth}
              y2={scaledHeight * 2 / 3}
              stroke="#000000"
              strokeWidth="2"
            />
          </>
        );
      }
    }

    // Молния
    if (config.settings.zipper.color) {
      elements.push(
        <line
          key="zipper"
          x1={scaledWidth / 2}
          y1="0"
          x2={scaledWidth / 2}
          y2={scaledHeight}
          stroke={config.settings.zipper.color}
          strokeWidth="3"
        />
      );
    }

    return elements;
  };

  const renderPocket = () => {
    if (!config.settings.pocket.position) return null;

    const { width: pocketWidth, height: pocketHeight } = config.settings.pocket.dimensions;
    const scaledPocketWidth = (pocketWidth * scaledWidth) / width;
    const scaledPocketHeight = (pocketHeight * scaledHeight) / height;

    let x = 0;
    let y = 0;

    switch (config.settings.pocket.position) {
      case 'top-left':
        x = 0;
        y = 0;
        break;
      case 'bottom-left':
        x = 0;
        y = scaledHeight - scaledPocketHeight;
        break;
      case 'bottom-right':
        x = scaledWidth - scaledPocketWidth;
        y = scaledHeight - scaledPocketHeight;
        break;
      default:
        return null;
    }

    return (
      <rect
        x={x}
        y={y}
        width={scaledPocketWidth}
        height={scaledPocketHeight}
        fill="#333333"
      />
    );
  };

  return (
    <CanvasContainer>
      <WindowSvg width={scaledWidth} height={scaledHeight}>
        {/* Window background */}
        <rect
          x="0"
          y="0"
          width={scaledWidth}
          height={scaledHeight}
          fill="#87CEEB"
          stroke={config.border?.color || '#000000'}
          strokeWidth="5"
        />
        
        {/* Render pocket */}
        {renderPocket()}
        
        {/* Render crossbars */}
        {renderCrossbars()}
        
        {/* Render fittings */}
        {renderFittings()}
      </WindowSvg>
    </CanvasContainer>
  );
}

export default WindowCanvas; 