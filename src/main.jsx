import React from 'react';
import ReactDOM from 'react-dom/client';
// Same cascade order as the source stylesheet: Webflow base → site design CSS → Splide core → embedded custom code
import './styles/normalize.css';
import './styles/site.css';
import '@splidejs/splide/dist/css/splide-core.min.css';
import './styles/custom.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
