import React from 'react';
import styled from 'styled-components';
import { useWindow } from '../contexts/WindowContext';
import { useModal } from '../contexts/ModalContext';

const ModalContainer = styled.div`
  position: relative;
  padding: 20px;
`;

const Title = styled.h2`
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 20px;
  color: #666666;
  cursor: pointer;
  
  &:hover {
    color: #000000;
  }
`;

const WindowItem = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const WindowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const WindowTitle = styled.h3`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin: 0;
`;

const WindowPrice = styled.span`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
`;

const WindowDetails = styled.div`
  margin-bottom: 15px;
`;

const DetailRow = styled.div`
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #666666;
  margin-bottom: 5px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: white;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: Arial, sans-serif;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #e9ecef;
  }
`;

const TotalPrice = styled.div`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e1e8ed;
`;

const CreateOrderButton = styled.button`
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #0056b3;
  }
`;

function CartModal() {
  const { windows, removeWindow, editWindow } = useWindow();
  const { closeAllModals, openCreateOrder } = useModal();

  const totalPrice = windows.reduce((sum, window) => sum + window.price, 0);

  const handleCreateOrder = () => {
    closeAllModals();
    openCreateOrder();
  };

  return (
    <ModalContainer>
      <Title>Корзина</Title>
      <CloseButton onClick={closeAllModals}>×</CloseButton>

      {windows.map((window, index) => (
        <WindowItem key={window.id}>
          <WindowHeader>
            <WindowTitle>Окно №{index + 1}</WindowTitle>
            <WindowPrice>{window.price.toLocaleString()} ₽</WindowPrice>
          </WindowHeader>
          <WindowDetails>
            <DetailRow>Материал: {window.material.name}</DetailRow>
            <DetailRow>Ширина окантовки: {window.border.width} см</DetailRow>
            <DetailRow>Цвет окантовки: {window.border.name}</DetailRow>
            <DetailRow>Крепления: {window.fittings.position}</DetailRow>
            <DetailRow>Тип креплений: {window.fittings.type}</DetailRow>
          </WindowDetails>
          <ButtonsContainer>
            <ActionButton onClick={() => editWindow(window.id)}>
              <span>✎</span> Редактировать окно
            </ActionButton>
            <ActionButton onClick={() => removeWindow(window.id)}>
              <span>🗑</span> Удалить окно
            </ActionButton>
            <ActionButton>
              <span>↓</span> Подробнее
            </ActionButton>
          </ButtonsContainer>
        </WindowItem>
      ))}

      <TotalPrice>Итого: {totalPrice.toLocaleString()} ₽</TotalPrice>
      <CreateOrderButton onClick={handleCreateOrder}>
        Создать заявку и перейти к оформлению
      </CreateOrderButton>
    </ModalContainer>
  );
}

export default CartModal; 