import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WindowProvider } from './contexts/WindowContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowProvider>
      <App />
    </WindowProvider>
  </React.StrictMode>
);

reportWebVitals(); 