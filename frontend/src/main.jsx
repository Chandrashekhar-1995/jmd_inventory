import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import "./index.css";
import appStore from "./store/appStore";
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
        <App />
      </Provider>
  )
