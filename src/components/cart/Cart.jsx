
import { useSelector } from "react-redux";
import ItemContent from "./ItemContent";

const Cart = () => {
  const { cart } = useSelector((state) => state.carts);
  return (
    <div className="flex scroll-smooth flex-col min-h-screen w-full bg-gray-50 p-6 md:px-14 lg:px-28">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🛒 Your Shopping Cart
      </h1>

      {/* Table Headers */}
      <div className="hidden md:grid grid-cols-[96px_1fr_120px_96px] gap-4 mb-3 px-6 py-3 bg-gray-100 rounded-t-xl text-gray-600 font-semibold uppercase tracking-wide border-b border-gray-300">
        <div>Product</div>
        <div>Name & Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Subtotal</div>
      </div>

      {/* Item 1 */}
      <div className="overflow-y-auto h-[490px] ">
        {cart &&
          cart.map((item,i) => {
           return <ItemContent key={i} item={item} />
          })}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white rounded-xl shadow p-4 space-y-2 text-right text-lg font-medium">
        <div className="flex justify-between text-gray-700">
          <span>Original Total:</span>
          <span>$459.97</span>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Total Discount:</span>
          <span>- $26.00</span>
        </div>
        <div className="flex justify-between font-bold text-black text-xl pt-2 border-t">
          <span>Final Total:</span>
          <span>$433.97</span>
        </div>
      </div>

      {/* Checkout */}
      <div className="text-right">
        <button className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
