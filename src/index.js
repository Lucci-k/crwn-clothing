import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CartProvider from './providers/cart/cart.provider';

import './index.css';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <CartProvider>
        <BrowserRouter>
          <PersistGate persistor={store.persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
