// // Cart.jsx

import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, removeFromCart, purchaseCourses } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, course) => sum + parseInt(course.price.replace("₹", "")),
    0
  );

  const handleRazorpayPayment = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: totalAmount * 100, // in paise
      currency: "INR",
      name: "Chembur Computer Institute",
      description: "Course Purchase",
      //image: "/logo.png",
      handler: function (response) {
        toast.success("Payment Successful!");
        console.log("Payment ID:", response.razorpay_payment_id);
        purchaseCourses(cartItems);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#1D4ED8",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-10 min-h-screen">
      {/* Cart Items */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6 underline">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-sm text-gray-700">
                    By Chembur Computer Institute
                  </p>
                  <div className="flex items-center gap-2 my-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        {i < Math.floor(item.rating) ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="text-sm text-gray-500">
                      ({item.rating})
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    Price: {item.price}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="mt-2 text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {cartItems.length > 0 && (
        <div className="bg-white shadow-lg p-6 rounded-lg h-fit border border-gray-200 w-full lg:w-1/3 mt-14">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <p className="text-gray-700 mb-2">
            Total Courses:{" "}
            <span className="font-bold">{cartItems.length}</span>
          </p>

          <ul className="mb-4 text-sm text-gray-800 space-y-1">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mb-4">
            Total Price:{" "}
            <span className="font-bold text-green-600">₹{totalAmount}</span>
          </p>

          <button
            onClick={handleRazorpayPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4 cursor-pointer transition duration-200"
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

