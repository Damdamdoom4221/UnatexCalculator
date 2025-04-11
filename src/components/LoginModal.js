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

function LoginModal() {
  const { closeAllModals, openRegister } = useModal();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await login(email, password);
      closeAllModals();
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <ModalContainer>
      <Title>Войти в аккаунт</Title>
      <CloseButton onClick={closeAllModals}>×</CloseButton>

      <Input
        type="email"
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <Error>{error}</Error>}

      <Button onClick={handleSubmit}>
        Войти
      </Button>

      <Link onClick={() => {
        closeAllModals();
        openRegister();
      }}>
        Нет учётной записи? Регистрация
      </Link>
    </ModalContainer>
  );
}

export default LoginModal; 