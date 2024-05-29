import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you import ReactDOM correctly
import App from './App.jsx';
import './index.css';
import { DatabaseProvider } from './DatabaseContext';
import { BrowserRouter } from "react-router-dom";

// Find the root element in HTML
const rootElement = document.getElementById('root');
// Create a root container instance
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <DatabaseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DatabaseProvider>
  </React.StrictMode>
);