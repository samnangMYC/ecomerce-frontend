import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
      <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors duration-300"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default CartEmpty;
