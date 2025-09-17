import React from "react";

const OrderSummary = ({ cart, address, paymentMethod,totalPrice }) => {

  return (
    <div className="max-w-2xl w-full mx-auto bg-white scroll-smooth shadow-lg rounded-2xl p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 h-[300px] overflow-y-auto ">
        <h3 className="text-lg font-semibold text-gray-700">Items</h3>
        <div></div>
        {cart?.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={item?.productId || index}
              className="flex items-center gap-4 p-4 rounded-xl border bg-gray-50 shadow-sm"
            >
              {item?.image ? (
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-md">
                  No Image
                </div>
              )}
        

              <div className="flex-1">
                <h4 className="text-gray-800 font-medium">{item.productName}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              <div className="text-right">
                <p className="text-indigo-600 font-bold">
                  ${(item.specialPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No items in cart.</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Shipping Address</h3>
        {address ? (
          <div className="text-gray-600 leading-6">
            <p>{address?.buildingName}</p>
            <p>{address?.street}</p>
            <p>{address?.city}, {address?.state}</p>
            <p>{address?.country}</p>
          </div>
        ) : (
          <p className="text-gray-400 italic">No address selected.</p>
        )}
      </div>

      {/* Payment */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-700">Payment Method</h3>
        {paymentMethod ? (
          <p className="text-gray-600 capitalize">{paymentMethod}</p>
        ) : (
          <p className="text-gray-400 italic">No payment method selected.</p>
        )}
      </div>

      {/* Total */}
      <div className="border-t pt-4 flex justify-between items-center">
        <span className="text-xl font-semibold text-gray-900">Total:</span>
        <span className="text-xl font-bold text-indigo-700">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
