import { useSelector } from "react-redux";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import formatPrice from "../../utils/formatPrice";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart } = useSelector((state) => state.carts);
    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );
      let originalTotal = 0;
  let totalDiscount = 0;

  if (Array.isArray(cart)) {
    cart.forEach((item) => {
      const quantity = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      const specialPrice = Number(item.specialPrice) || 0;
      const discountRate = Number(item.discount) || 0;

      originalTotal += price * quantity;
      totalDiscount += discountRate * specialPrice * quantity;
    });
  


  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  } else {
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
          {Array.isArray(cart) ? (
            cart.map((item, i) => <ItemContent key={i} item={item} />)
          ) : (
            <p>No items in cart</p>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 bg-white rounded-xl shadow p-4 space-y-2 text-right text-lg font-medium">
          <div className="flex justify-between text-gray-700">
            <span>Original Total:</span>
            <span>{formatPrice(originalTotal)}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Total Discount:</span>
            <span>- {formatPrice(totalDiscount)}</span>
          </div>
          <div className="flex justify-between font-bold text-black text-xl pt-2 border-t">
            <span>Final Total:</span>
            <span>{formatPrice(newCart?.totalPrice)}</span>
          </div>
        </div>
        
        {/* Checkout */}
        <Link to={"/checkout"} className="text-right">
          <button className="mt-4 hover:cursor-pointer px-6 py-3 bg-gradient-to-r from-indigo-500 from-10%  via-sky-500 to-emerald-500
             hover:text-orange-100 duration-300 ease-in-out
             hover:shadow-[0_0_15px_rgb(255,165,0)]
              text-white font-semibold rounded-xl hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </Link>
      </div>
  
    );
  }
  }
};

export default Cart;
