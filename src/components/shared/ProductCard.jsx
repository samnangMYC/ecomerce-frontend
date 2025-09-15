import { useState } from "react";
import ProductViewModal from "../shared/ProductViewModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
import imgPlaceholder from "../../assets/image-placeholder.png";
const ProductCard = ({ product }) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectViewProduct, setSelectedViewProduct] = useState("");
  
  const handleProductView = (product) => {
    setOpenProductViewModal(true);
    setSelectedViewProduct(product);
  };

  const isAvailable = product.quantity && Number(product.quantity) > 0;
  const dispatch = useDispatch();

  const handleAddToCart = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };
  return (
    <div
      key={product.productId}
      className="rounded-2xl shadow-lg bg-white overflow-hidden hover:cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      {product?.image ? (
        <img
          src={product.image}
          alt={product.productName}
          onClick={() => handleProductView(product)}
          className="w-full h-48 lg:h-72 object-cover transform transition-transform duration-300 hover:scale-110"
        />
      ) : (
        <img
          src={imgPlaceholder}
          alt={product.productName}
          onClick={() => handleProductView(product)}
          className="w-full h-48 lg:h-72 object-cover transform transition-transform duration-300 hover:scale-110"
        />
      )}

      <div className="p-4">
        <div onClick={() => handleProductView(product)}>
          <h2 className="text-lg line-clamp-1 font-semibold text-gray-800 hover:text-orange-400">
            {product.productName}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-indigo-600">
            ${product.specialPrice.toFixed(2)}
          </span>
          <div className="text-yellow-500 text-sm">★★★★☆</div>
        </div>
        <p className="text-sm text-slate-500 line-through">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => {
            handleAddToCart(product);
          }}
          className={`mt-4 w-full hover:cursor-pointer ${
            isAvailable
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-red-500 hover:bg-red-700 cursor-not-allowed"
          } text-white py-2 px-4 rounded-lg transition duration-200`}
          disabled={!isAvailable}
        >
          {isAvailable ? "Add to Cart" : "Out Of Stock"}
        </button>
      </div>

      {openProductViewModal &&
        selectViewProduct.productId === product.productId && (
          <ProductViewModal
            product={selectViewProduct}
            setOpen={setOpenProductViewModal}
            addToCardHandler ={() => handleAddToCart(product)}
          />
        )}
    </div>
  );
};

export default ProductCard;
