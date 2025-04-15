
import { 
    FaSearch, FaMicrophone, FaHome, FaTrophy, FaShoppingCart, 
    FaHistory, FaHeart, FaCode, FaComments 
  } from "react-icons/fa";
import { useNavigate , useLocation, Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";



const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  return (
    <div className="w-64 shadow-lg p-5 min-h-screen">
      <ul className="py-2 space-y-4">
        <li
          className={`flex items-center space-x-3 cursor-pointer hover:text-blue-600
            ${
              location.pathname === "/"
                ? "underline font-semibold text-blue-600"
                : ""
            }`}
        >
          <Link to="/" className="flex items-center gap-2 w-full h-full">
            <FaHome /> <span>Home</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-3 cursor-pointer hover:text-blue-600
            ${
              location.pathname === "/purchases"
                ? "underline font-semibold text-blue-600"
                : ""
            }`}
        >
          <Link
            to="/purchases"
            className="flex items-center gap-2 w-full h-full"
          >
            <FaShoppingCart /> <span>Purchases</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-3 cursor-pointer hover:text-blue-600
            ${
              location.pathname === "/history"
                ? "underline font-semibold text-blue-600"
                : ""
            }`}
        >
          <Link to="/history" className="flex items-center gap-2 w-full h-full">
            <FaHistory /> <span>History</span>
          </Link>
        </li>

        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
          <FaHeart /> <span>Watchlist</span>
        </li>

        {/* <li
          className={`flex items-center space-x-3 cursor-pointer hover:text-blue-600
            ${location.pathname === "/cart"
              ? "bg-blue-200 rounded font-semibold pl-1"
              : ""}`}
        ><Link to="/cart" className="flex items-center gap-2 w-full h-full">
           <FaShoppingCart /> <span>Cart</span>
           {cartItems.length > 0 && (
              <span className=" bg-blue-400 text-black text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </li> */}

        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
          <FaTrophy /> <span>Achievements</span>
        </li>

        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
          <FaCode /> <span>Code Compiler</span>
        </li>

        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
          <FaComments /> <span>Chatbox</span>
        </li>
      </ul>
    </div>
  );

}

export default Sidebar

