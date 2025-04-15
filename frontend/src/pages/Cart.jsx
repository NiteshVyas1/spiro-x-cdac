import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); // Access cart data and functions

  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      cartItems.forEach(item =>
        toast.success(`${item.name} course purchased!`)
      );
    }
  };

  return (
    <div className="p-6 flex-1 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 underline">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-3 rounded"
                />
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="text-sm text-gray-800 mb-2">
                  By Chembur Computer Institute
                </p>
                <p className="text-sm text-gray-800 mb-2">Price: ₹4999</p>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Place Order Button */}
          <div className="mt-10">
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-md cursor-pointer"
            >
              Place Your Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
