import React from 'react';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useWindow } from '../contexts/WindowContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e1e8ed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LogoImg = styled.div`
  height: 40px;
  width: 100px;
  background-color: #ccc; // Временная замена логотипа
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.color || '#007bff'};
  padding: 5px 10px;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: #e9ecef;
  }
`;

const CartPrice = styled.span`
  font-weight: bold;
`;

function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price);
}

function Header() {
  const { config } = useWindow();

  return (
    <HeaderContainer>
      <LeftSection>
        <LogoImg />
        <Button>
          <span>Войти</span>
        </Button>
        <Button>
          <span>В корзине: <CartPrice>{formatPrice(config.price)} ₽</CartPrice></span>
        </Button>
      </LeftSection>
      <RightSection>
        <Button>
          <span>Регион</span>
        </Button>
        <Button color="#ff0000">
          <span>Паспорт окна</span>
        </Button>
        <Button>
          <span>Помощь</span>
        </Button>
        <CircularProgressbar
          value={config.progress}
          maxValue={45}
          text={`${config.progress}/45`}
          styles={{
            path: { stroke: '#007bff' },
            text: { fill: '#007bff', fontSize: '12px', fontFamily: 'Arial' },
            trail: { stroke: '#d6d6d6' },
            root: { width: 40, height: 40 },
          }}
        />
      </RightSection>
    </HeaderContainer>
  );
}

export default Header; 