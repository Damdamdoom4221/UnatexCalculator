import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 30px;
`;

const Section = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #000000;
`;

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const OrderCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #e1e8ed;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const OrderNumber = styled.div`
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
`;

const OrderDate = styled.div`
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #666666;
`;

const OrderDetails = styled.div`
  margin-bottom: 15px;
`;

const OrderStatus = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-family: Arial, sans-serif;
  font-size: 12px;
  background: ${props => {
    switch (props.status) {
      case 'pending':
        return '#fff3cd';
      case 'processing':
        return '#cfe2ff';
      case 'completed':
        return '#d1e7dd';
      case 'cancelled':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#856404';
      case 'processing':
        return '#084298';
      case 'completed':
        return '#0f5132';
      case 'cancelled':
        return '#842029';
      default:
        return '#383d41';
    }
  }};
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

function Profile() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки заказов');
      }

      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Ожидает обработки';
      case 'processing':
        return 'В обработке';
      case 'completed':
        return 'Выполнен';
      case 'cancelled':
        return 'Отменён';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <Container>
      <Title>Личный кабинет</Title>

      <Section>
        <SectionTitle>Персональные данные</SectionTitle>
        <UserInfo>
          <InfoItem>
            <Label>Фамилия</Label>
            <Value>{user?.lastName}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Имя</Label>
            <Value>{user?.firstName}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Отчество</Label>
            <Value>{user?.middleName}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Email</Label>
            <Value>{user?.email}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Телефон</Label>
            <Value>{user?.phone}</Value>
          </InfoItem>
        </UserInfo>
        <Button onClick={logout}>Выйти</Button>
      </Section>

      <Section>
        <SectionTitle>Мои заказы</SectionTitle>
        <OrdersGrid>
          {orders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderNumber>Заказ #{order.number}</OrderNumber>
                <OrderDate>{new Date(order.createdAt).toLocaleDateString()}</OrderDate>
              </OrderHeader>
              <OrderDetails>
                <div>Количество окон: {order.windows.length}</div>
                <div>Сумма заказа: {order.totalPrice} ₽</div>
              </OrderDetails>
              <OrderStatus status={order.status}>
                {getStatusText(order.status)}
              </OrderStatus>
            </OrderCard>
          ))}
        </OrdersGrid>
      </Section>
    </Container>
  );
}

export default Profile; 