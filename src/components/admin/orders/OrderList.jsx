import React from "react";

const OrderList = ({ orders }) => {
  const orderArray = Array.isArray(orders) ? orders : orders ? [orders] : [];

  if (orderArray.length === 0) {
    return (
      <div className="p-12 text-center text-gray-400 text-xl font-light">
        No orders found.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-8">
      {orderArray.map((order) => {
        const formattedDate = order.date
          ? new Date(order.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "Unknown Date";

        return (
          <article
            key={order.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Header */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2 md:mb-0">
                Order #{order.id}
              </h2>
              <time
                dateTime={order.date}
                className="text-gray-500 font-semibold"
              >
                {formattedDate}
              </time>
            </header>

            {/* Customer Info & Status */}
            <section className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div className="text-gray-700 text-lg font-medium">
                <p>Email: {order.email}</p>
                <p>Address ID: {order.addressId}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </section>

            {/* Payment Details */}
            <section className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Payment Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                <p>
                  <span className="font-semibold">Method:</span>{" "}
                  {order.payment?.paymentMethod || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {order.payment?.pgStatus || "N/A"}
                </p>
                <p className="col-span-2 md:col-span-1">
                  <span className="font-semibold">Gateway:</span>{" "}
                  {order.payment?.pgName || "N/A"}
                </p>
                <p className="col-span-2 md:col-span-3 text-sm italic text-gray-500">
                  {order.payment?.pgResponseMessage || ""}
                </p>
              </div>
            </section>

            {/* Order Items */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Items ({order.orderItems.length})
              </h3>
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {order.orderItems.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex items-center border-2 border-dotted gap-4 p-4  rounded-lg bg-white"
                  >
                    {/* Product Image */}
                    {item.product.image && (
                      <img
                        src={`http://localhost:8080/images/${item.product.image}`}
                        alt={item.product.productName}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}

                    {/* Product Details */}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {item.product.productName}
                      </h4>
                      <p className="text-gray-600 text-sm italic">
                        {item.product.description}
                      </p>
                      <div className="mt-1 text-sm text-gray-700 space-y-1">
                        <p>In Stock: {item.product.quantity}</p>
                        <p>Price: ${item.product.price.toFixed(2)}</p>
                        <p>Discount: {(item.product.discount * 100).toFixed(0)}%</p>
                        <p>Special Price: ${item.product.specialPrice.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Order Item Details */}
                    <div className="text-right font-semibold text-gray-900 space-y-1 min-w-[100px]">
                      <p>Qty: {item.quantity}</p>
                      <p>
                        Price/Unit: ${item.orderedProductPrice.toFixed(2)}
                      </p>
                      <p>
                        Total: $
                        {(item.orderedProductPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Order Total */}
            <footer className="mt-6 text-right">
              <p className="text-xl font-bold text-gray-900">
                Order Total: ${order.totalAmount.toFixed(2)}
              </p>
            </footer>
          </article>
        );
      })}
    </div>
  );
};

export default OrderList;
