import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductViewModal = ({
  product,
  setOpen,
  addToCardHandler = null,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Modal Content */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full mx-4 z-10 max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute hover:cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700 text-5xl"
          >
            &times;
          </button>

          {/* Modal Body */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.productName}
              className="w-full md:w-1/2 h-[400px] object-cover rounded-xl"
            />

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  {product.productName}
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-semibold text-indigo-600">
                    ${product.specialPrice}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                </div>

                <p className="text-base text-gray-600">
                  Quantity:{" "}
                  <span className="font-medium">{product.quantity}</span>
                </p>

                {addToCardHandler && (
                  <button
                    onClick={addToCardHandler}
                    className="mt-4 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
                    disabled={Number(product.quantity) <= 0}
                  >
                    {Number(product.quantity) > 0
                      ? "Add to Cart"
                      : "Out Of Stock"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductViewModal;
