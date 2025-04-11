import React, { useState } from 'react';
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

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background: ${props => props.primary ? '#007bff' : 'white'};
  color: ${props => props.primary ? 'white' : '#007bff'};
  border: 1px solid #007bff;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background: ${props => props.primary ? '#0056b3' : '#e9ecef'};
  }
`;

function CreateOrderModal() {
  const { closeAllModals } = useModal();
  const { createOrder } = useWindow();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    city: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    createOrder(formData);
    closeAllModals();
  };

  return (
    <ModalContainer>
      <Title>Создание заявки</Title>
      <CloseButton onClick={closeAllModals}>×</CloseButton>

      <Section>
        <SectionTitle>Контактные данные</SectionTitle>
        <Input
          name="lastName"
          placeholder="Фамилия"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          name="firstName"
          placeholder="Имя"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          name="middleName"
          placeholder="Отчество"
          value={formData.middleName}
          onChange={handleChange}
        />
        <Input
          name="phone"
          placeholder="Номер телефона"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="city"
          placeholder="Населённый пункт"
          value={formData.city}
          onChange={handleChange}
        />
      </Section>

      <Section>
        <SectionTitle>Комментарий к заказу</SectionTitle>
        <TextArea
          name="comment"
          placeholder="Введите комментарий"
          value={formData.comment}
          onChange={handleChange}
        />
      </Section>

      <Button primary onClick={handleSubmit}>
        Создать заявку
      </Button>
      <Button onClick={() => {}}>
        Отправить запрос консультанту
      </Button>
      <Button onClick={closeAllModals}>
        Вернуться назад
      </Button>
    </ModalContainer>
  );
}

export default CreateOrderModal; 