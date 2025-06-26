import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import SetQuantity from "./SetQuantity";

const ItemContent = ({ item }) => {
  const discount = item.discount * item.specialPrice;
  const quantity = item.quantity;
  const [currentQty, setCurrentQty] = useState(quantity || 1);

  //   useEffect(() => {
  //     console.log(quantity);
  //   })

  return (
    <motion.div
      className="flex flex-col md:grid md:grid-cols-[96px_1fr_120px_96px] items-center bg-white rounded-xl shadow-md p-4 gap-4 mb-4"
      whileHover={{ scale: 1.01 }}
    >
      <img
        src={item.image}
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
            {" "}
            {item.discount * 100}% OFF
          </span>
        </p>
      </div>
      <SetQuantity
        quantity={currentQty}
        cartCounter={true}
        handleQtyIncrease={() => {}}
        handleQtyDecrease={() => {}}
      />

      <div className="flex flex-row md:flex-col items-center md:items-end text-right gap-2">
        <p className="text-md font-semibold text-black">
          ${item.specialPrice.toFixed(2)}
        </p>
        <button className="text-red-400 hover:cursor-pointer">Remove</button>
      </div>
    </motion.div>
  );
};

export default ItemContent;
