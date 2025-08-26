import React from "react";
import OrderTable from "./OrderTable";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useOrderFilter } from "../../../hook/useOrderFilter";

const AdminOrders = () => {
  const { adminOrder, pagination } = useSelector((state) => state.orders);

  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder?.length === 0;
  return (
    <div className="pt-6 pb-6  ">
      {emptyOrder ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
            <FaShoppingCart size={28} className="text-gray-500" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Orders Yet
          </h3>

          <p className="mt-1 text-sm text-gray-500 max-w-sm">
            Your store hasn’t received any orders. Once a customer places an
            order, it will show up here.
          </p>

          <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            View Products
          </button>
        </div>
      ) : (
        <div className="w-full overflow-x-auto ">
            <OrderTable adminOrders={adminOrder} pagination={pagination} />
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
