import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
    setIsCreateOrderOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const openCreateOrder = () => {
    setIsCartOpen(false);
    setIsCreateOrderOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const openLogin = () => {
    setIsCartOpen(false);
    setIsCreateOrderOpen(false);
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsCartOpen(false);
    setIsCreateOrderOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeAllModals = () => {
    setIsCartOpen(false);
    setIsCreateOrderOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <ModalContext.Provider 
      value={{ 
        isCartOpen,
        isCreateOrderOpen,
        isLoginOpen,
        isRegisterOpen,
        openCart,
        openCreateOrder,
        openLogin,
        openRegister,
        closeAllModals
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
} 