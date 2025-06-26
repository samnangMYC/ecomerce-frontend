import React from "react";
import { Minus, Plus } from "lucide-react";

const SetQuantity = ({
  quantity,
  cartCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {cartCounter && (
        <>
          <button
           disabled={quantity<=1}
            onClick={handleQtyDecrease}
            className="p-1 rounded bg-gray-200"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm text-black">{quantity}</span>
          <button
            onClick={handleQtyIncrease}
            className="p-1 rounded bg-gray-200"
          >
            <Plus size={14}
             />
          </button>
        </>
      )}
    </div>
  );
};

export default SetQuantity;
