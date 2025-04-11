import React from 'react';
import styled from 'styled-components';
import { useWindow } from '../contexts/WindowContext';

const CartContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  background: white;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e1e8ed;
`;

const CartTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const CartItem = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
`;

const ItemDetails = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background: ${props => props.primary ? '#007bff' : 'white'};
  color: ${props => props.primary ? 'white' : '#007bff'};
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CartSummary = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  padding: 15px 0;
  border-top: 1px solid #e1e8ed;
  margin-top: 20px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const CheckoutButton = styled(ActionButton)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, loadWindow } = useWindow();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleLoadWindow = (window) => {
    loadWindow(window.id);
    onClose();
  };

  return (
    <CartContainer isOpen={isOpen}>
      <CartHeader>
        <CartTitle>Корзина</CartTitle>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </CartHeader>

      {cart.length === 0 ? (
        <div>Корзина пуста</div>
      ) : (
        <>
          {cart.map((window) => (
            <CartItem key={window.id}>
              <ItemHeader>
                <ItemTitle>Окно {window.form}</ItemTitle>
                <ItemPrice>{window.price} ₽</ItemPrice>
              </ItemHeader>
              <ItemDetails>
                <div>Материал: {window.material.name}</div>
                <div>Окантовка: {window.border.name}</div>
                {window.settings.pocket.position && (
                  <div>
                    Карман: {window.settings.pocket.position} 
                    ({window.settings.pocket.dimensions.width}x
                    {window.settings.pocket.dimensions.height})
                  </div>
                )}
              </ItemDetails>
              <ItemActions>
                <ActionButton onClick={() => handleLoadWindow(window)}>
                  Редактировать
                </ActionButton>
                <ActionButton onClick={() => removeFromCart(window.id)}>
                  Удалить
                </ActionButton>
              </ItemActions>
            </CartItem>
          ))}

          <CartSummary>
            <TotalPrice>
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </TotalPrice>
            <CheckoutButton primary>
              Оформить заказ
            </CheckoutButton>
          </CartSummary>
        </>
      )}
    </CartContainer>
  );
}

export default Cart; 