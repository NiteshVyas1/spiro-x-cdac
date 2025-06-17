import {
  FaSearch,
  FaMicrophone,
  FaHome,
  FaTrophy,
  FaShoppingCart,
  FaHistory,
  FaHeart,
  FaCode,
  FaComments,
  FaPlay,
} from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  return (
    <div className="w-full h-16 md:w-64 md:min-h-screen p-2 md:p-5 bg-white fixed bottom-0 md:relative md:bottom-auto z-50 border-t md:border-none">
      <ul className="flex md:flex-col justify-around md:justify-start items-center md:items-start space-x-0 md:space-x-0 space-y-0 md:space-y-3 px-3">
        <li
          className={`flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/"
                ? " bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/" className="flex items-center gap-1 md:gap-2 w-full h-full">
            <FaHome /> <span className="hidden md:inline">Home</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/mycourses"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link
            to="/mycourses"
            className="flex items-center gap-1 md:gap-2 w-full h-full"
          >
            <FaPlay /> <span className="hidden md:inline">My Courses</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/purchases"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link
            to="/purchases"
            className="flex items-center gap-1 md:gap-2 w-full h-full"
          >
            <FaShoppingCart /> <span className="hidden md:inline">Purchases</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/watchlist"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/watchlist" className="flex items-center gap-1 md:gap-2 w-full h-full">
            <FaHeart /> <span className="hidden md:inline">Watchlist</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/history"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/history" className="flex items-center gap-1 md:gap-2 w-full h-full">
            <FaHistory /> <span className="hidden md:inline">History</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/quiz"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/quiz" className="flex items-center gap-1 md:gap-2 w-full h-full">
            <FaCode /> <span className="hidden md:inline">Quiz</span>
          </Link>
        </li>


        <li className="flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md">
          <FaTrophy /> <span className="hidden md:inline">Achievements</span>
        </li>


        <li className="flex items-center space-x-1 md:space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md">
          <FaComments /> <span className="hidden md:inline">Chatbox</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
