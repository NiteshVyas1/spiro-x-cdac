import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { courses } from '../assets/assets';

const Cart = () => {
  const { cartItems, removeFromCart , purchaseCourses} = useCart(); // Access cart data and functions

  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      cartItems.forEach(item =>
        toast.success(`${item.name} course added to My Courses successfully!`)
      );
      purchaseCourses(cartItems);
    } else{
      toast.error("Your cart is empty! Please add items to your cart before placing an order.");
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
                className="bg-white rounded-lg shadow-lg max-w-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-50 object-cover rounded"
                />
                <div className="pl-2">
                <h4 className="font-bold text-lg pt-2">{item.name}</h4>
                <p className="text-sm text-gray-800">
                  By Chembur Computer Institute
                </p>
                
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    {i < Math.floor(item.rating) ? "★" : "☆"}
                  </span>
                ))}
                <span className="text-md text-gray-600 ml-2">
                  ({item.rating})
                </span>
              
                <p className="text-md text-gray-800">Price: {item.price} </p>
                
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-gray-800 py-3  rounded hover:text-red-600 text-sm cursor-pointer"
                >
                  Remove
                </button>
                </div>

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
