import React, { useState } from 'react';
import styled from 'styled-components';
import { useModal } from '../contexts/ModalContext';
import { useAuth } from '../contexts/AuthContext';

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

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #0056b3;
  }
`;

const Link = styled.a`
  display: block;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #007bff;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled.div`
  color: #ff0000;
  font-family: Arial, sans-serif;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
`;

function RegisterModal() {
  const { closeAllModals, openLogin } = useModal();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await register(formData);
      closeAllModals();
    } catch (err) {
      setError('Ошибка при регистрации. Попробуйте позже.');
    }
  };

  return (
    <ModalContainer>
      <Title>Регистрация</Title>
      <CloseButton onClick={closeAllModals}>×</CloseButton>

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
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Телефон"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Подтвердите пароль"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      {error && <Error>{error}</Error>}

      <Button onClick={handleSubmit}>
        Зарегистрироваться
      </Button>

      <Link onClick={() => {
        closeAllModals();
        openLogin();
      }}>
        Уже есть аккаунт? Войти
      </Link>
    </ModalContainer>
  );
}

export default RegisterModal; 