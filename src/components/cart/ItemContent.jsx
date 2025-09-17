import React, { useEffect, useState } from "react";
import dummyImage from "../../assets/image-placeholder.png";
import { motion } from "framer-motion";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import toast from "react-hot-toast";

const ItemContent = ({ item }) => {

  const [currentQty, setCurrentQty] = useState(item.quantity || 1);
  const dispatch = useDispatch();

   const imageUrl = item.image
    ? `http://localhost:8080/images/${item.image}`
    : dummyImage;

  useEffect(() => {
    setCurrentQty(item.quantity || 1);
  }, [item.quantity]);

  const quantity = currentQty;
  const discount = item.discount * item.specialPrice * quantity;
  const subtotal = item.specialPrice * quantity;

  const handleQtyIncrease = (cartItems) => {
    dispatch(increaseCartQuantity(cartItems, toast, currentQty, setCurrentQty));
  };

  const handleQtyDecrease = (cartItems) => {
    if (currentQty > 1) {
      const newQuantity = currentQty - 1;
      setCurrentQty(newQuantity);
      dispatch(decreaseCartQuantity(cartItems, newQuantity));
    }
  };

  const removeItemFromCart = (cartItems) => {
    dispatch(removeFromCart(cartItems, toast));
  };


  return (
    <motion.div
      className="flex flex-col md:grid md:grid-cols-[96px_1fr_120px_96px] items-center bg-white rounded-xl shadow-md p-4 gap-4 mb-4"
      whileHover={{ scale: 1.01 }}
    >
      <img
        src={imageUrl}
        alt={item.productName}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div>
        <h3 className="text-lg font-medium">{item.productName}</h3>
        <p className="text-sm text-gray-500">
          <span className="line-through mr-2 text-gray-400">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-red-500 font-semibold pr-2">
            -${discount.toFixed(2)}
          </span>
          <span className="bg-gradient-to-br from-red-500 to-red-300 text-white p-1">
            {((item.discount ?? 0) * 100).toFixed(0)}% OFF
          </span>
        </p>
      </div>
      <SetQuantity
        quantity={currentQty}
        cartCounter={true}
        handleQtyIncrease={() => {
          handleQtyIncrease({ ...item });
        }}
        handleQtyDecrease={() => {
          handleQtyDecrease({ ...item });
        }}
      />

      <div className="flex flex-row md:flex-col items-center md:items-end text-right gap-2">
        <p className="text-md font-semibold text-black">
          ${subtotal.toFixed(2)}
        </p>
        <button
          onClick={() => {
            removeItemFromCart({ ...item });
          }}
          className="text-red-400 hover:cursor-pointer"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};


export default ItemContent;
