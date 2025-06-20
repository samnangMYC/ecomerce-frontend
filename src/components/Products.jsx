
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions";
import ProductViewModal from "./ProductViewModal";
import Filter from "./Filter";

const Products = () => {
  
  const {isLoading,errorMessage} = useSelector((state) => state.error)

  const handleProductView = (product) => {
    setOpenProductViewModal(true);
    setSelectedViewProduct(product);

  }
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());

  },[dispatch]) 
  
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectViewProduct, setSelectedViewProduct] = useState("");

  
if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="text-center text-red-500">{errorMessage}</p>;
  }

  
  return (
    <div className="p-24 space-y-18">

      <Filter />

     <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products && products.map((product) => {
        const isAvailable = product.quantity && Number(product.quantity) > 0;

        return (
          <div
            key={product.productId}
            className="rounded-2xl shadow-lg bg-white overflow-hidden hover:cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.productName}
              onClick={() => handleProductView(product)}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div onClick={() => handleProductView(product)}>
                <h2 className="text-lg font-semibold text-gray-800 hover:text-orange-400">
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
              onClick={() => {}}
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
            {openProductViewModal && (
              <ProductViewModal
                product={selectViewProduct}
                onClose={() => setOpenProductViewModal(false)}
              />
            )}

          </div>
        );
      })}
    </div>

   </div>
  )
}

export default Products