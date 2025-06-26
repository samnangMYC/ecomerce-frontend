import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions";

import Filter from "./Filter";
import useProductFilter from "../../hook/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import ProductCard from "../shared/ProductCard";
import { motion } from "framer-motion";

const Products = () => {
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state) => state.error);
  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );

  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="p-6 scroll-smooth space-y-12 w-full">
          <Filter categories={categories ?? []} />

          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p className="text-center text-red-500 col-span-full">
              {errorMessage}
            </p>
          ) : products && products.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <div key={product.productId}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <div className="flex pt-10 justify-center">
                <Paginations
                  numberOfPage={pagination?.totalPages}
                  totalProducts={pagination?.totalElements}
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Products;
