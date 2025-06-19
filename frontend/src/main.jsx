import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { CartProvider } from './context/CartContext';
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WatchlistProvider>
      <ShopContextProvider>
        <CartProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CartProvider>
      </ShopContextProvider>
    </WatchlistProvider>
  </BrowserRouter>
);
