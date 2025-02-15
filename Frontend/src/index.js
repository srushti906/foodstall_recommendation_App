// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Optional: Your global CSS
import { UserProvider } from './components/UserContext'; // Adjust path as necessary

ReactDOM.render(
  <React.StrictMode>
     <UserProvider>
     <App />
     </UserProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);
