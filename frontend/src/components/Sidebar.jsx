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
    <div className="w-64 p-5 min-h-screen">
      <ul className="px-3 space-y-3 ">
        <li
          className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/"
                ? " bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/" className="flex items-center gap-2 w-full h-full">
            <FaHome /> <span>Home</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/mycourses"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link
            to="/mycourses"
            className="flex items-center gap-2 w-full h-full"
          >
            <FaPlay /> <span>My Courses</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/purchases"
                ? "bg-gray-200 rounded-md"
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
          className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/watchlist"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/watchlist" className="flex items-center gap-2 w-full h-full">
            <FaHeart /> <span>Watchlist</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/history"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/history" className="flex items-center gap-2 w-full h-full">
            <FaHistory /> <span>History</span>
          </Link>
        </li>

        <li
          className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md
            ${
              location.pathname === "/quiz"
                ? "bg-gray-200 rounded-md"
                : ""
            }`}
        >
          <Link to="/quiz" className="flex items-center gap-2 w-full h-full">
            <FaCode /> <span>Quiz</span>
          </Link>
        </li>


        <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md">
          <FaTrophy /> <span>Achievements</span>
        </li>


        <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 pt-2 pb-2 pl-2 rounded-md">
          <FaComments /> <span>Chatbox</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
