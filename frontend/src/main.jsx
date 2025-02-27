import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import "./index.css";
import appStore from "./store/appStore";
import App from "./App.jsx";
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
        <ToastContainer />
      </Provider>
  )
