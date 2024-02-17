import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Ensure this matches the installed package
import App from './App';

// Ensure 'root' exists in your index.html
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <BrowserRouter> {/* Corrected case */}
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
