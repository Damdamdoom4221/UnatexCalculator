import React from 'react';
import styled from 'styled-components';

const RulerContainer = styled.div`
  position: relative;
  width: ${props => props.width / 10}px;
  height: ${props => props.height / 10}px;
`;

const HorizontalRuler = styled.svg`
  position: absolute;
  bottom: 0;
  width: ${props => props.width / 10}px;
  height: 20px;
`;

const VerticalRuler = styled.svg`
  position: absolute;
  right: 0;
  width: 20px;
  height: ${props => props.height / 10}px;
`;

function Ruler({ width, height }) {
  const horizontalMarks = [2.5, 36.8, 70.8, 105, 139.2, 173.3];
  const verticalMarks = [0, 105, 191.3];

  return (
    <RulerContainer width={width} height={height}>
      <HorizontalRuler width={width} height={height}>
        <line x1="0" y1="10" x2={width / 10} y2="10" stroke="black" strokeWidth="1" />
        {horizontalMarks.map((mark, i) => (
          <g key={i}>
            <line x1={mark} y1="5" x2={mark} y2="15" stroke="black" strokeWidth="1" />
            <text x={mark - 5} y="20" fontSize="8" fontFamily="Arial, sans-serif">
              {mark}
            </text>
          </g>
        ))}
        <text x="5" y="15" fontSize="12" fontFamily="Arial, sans-serif" fill="black">
          200mm
        </text>
      </HorizontalRuler>
      <VerticalRuler width={width} height={height}>
        <line x1="10" y1="0" x2="10" y2={height / 10} stroke="black" strokeWidth="1" />
        {verticalMarks.map((mark, i) => (
          <g key={i}>
            <line x1="5" y1={mark} x2="15" y2={mark} stroke="black" strokeWidth="1" />
            <text x="20" y={mark + 3} fontSize="8" fontFamily="Arial, sans-serif">
              {mark}
            </text>
          </g>
        ))}
        <text x="20" y="15" fontSize="12" fontFamily="Arial, sans-serif" fill="black">
          2000mm
        </text>
      </VerticalRuler>
    </RulerContainer>
  );
}

export default Ruler; 