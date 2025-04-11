import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ViewPort from './components/ViewPort';
import Cart from './components/Cart';
import { WindowProvider } from './contexts/WindowContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  padding: 20px;
  gap: 20px;
`;

const SidebarWrapper = styled.div`
  width: 40%;
  height: 100%;
  padding: 20px;
`;

const ViewPortWrapper = styled.div`
  width: 60%;
  height: 100%;
  padding: 20px;
`;

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <WindowProvider>
        <AppContainer>
          <Header />
          <MainContent>
            <SidebarWrapper>
              <Sidebar onCartClick={() => setIsCartOpen(true)} />
            </SidebarWrapper>
            <ViewPortWrapper>
              <ViewPort />
            </ViewPortWrapper>
          </MainContent>
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </AppContainer>
      </WindowProvider>
    </Router>
  );
}

export default App; 