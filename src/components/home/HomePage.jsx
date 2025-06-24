import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { fetchProducts } from "../../store/actions";
import Loader from "../shared/Loader";
import Navbar from "../shared/Navbar";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full bg-gray-50 space-y-8">
      {/* Navigation Section */}
      <Navbar />

      {/* Hero Section */}
      <HeroBanner />

      {/* Featured Products Section */}
      <section className="  mx-auto px-4 sm:px-6 lg:px-8  py-12">
        <div className=" ">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Featured Products
          </h2>

          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p className="text-center text-red-500 col-span-full">
              {errorMessage}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products &&
                products.slice(0, 8).map((product) => (
                  <div key={product.productId}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
