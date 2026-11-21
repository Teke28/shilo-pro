import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import './index.css';
import './brand.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The application root element (#root) is missing.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
