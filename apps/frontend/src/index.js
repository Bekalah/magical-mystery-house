/**
 * @license CC0-1.0 - Public Domain
 */

import React from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);