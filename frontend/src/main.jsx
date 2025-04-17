import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <ShopContextProvider>

        <App />
        
      </ShopContextProvider>
    </CartProvider>
  </BrowserRouter>
);
