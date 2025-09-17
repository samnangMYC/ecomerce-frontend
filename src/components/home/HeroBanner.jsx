import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import { bannerList } from "../../utils";
import { Link } from "react-router-dom";

const colors = [
  "#c40ef1ff", // Yellow
  "#0ecac1ff", // Red
  "#21AD61", // Green
  "#6401c7ff", // Purple
];

const HeroBanner = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        grabCursor
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        history={{ key: "slide" }}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        pagination={{ clickable: true }}
        className="mySwiper"
        effect="fade"
      >
        {bannerList.map((item, i) => (
          <SwiperSlide key={item.key || i}>
            <div
              className="w-full h-[600px] sm:h-[500px] flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 py-10 transition-all duration-500"
              style={{ backgroundColor: colors[i % colors.length] }}
            >
              {/* Text Section */}
              <div className="sm:w-1/2 w-full text-center sm:text-left text-white space-y-4">
                <h3 className="text-base sm:text-xl font-medium tracking-wide uppercase">
                  {item.title}
                </h3>
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight drop-shadow">
                  {item.subtitle}
                </h1>
                <p className="text-sm sm:text-base text-white/90 max-w-md mx-auto sm:mx-0">
                  {item.description}
                </p>
                <Link
                  to="/products"
                  className="inline-block mt-4 bg-white text-black font-semibold px-6 py-2 rounded-md shadow-md transition hover:bg-black hover:text-white"
                >
                  Shop Now
                </Link>
              </div>

              {/* Image Section */}
              <div className="sm:w-1/2 w-full mt-6 sm:mt-0 flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-w-md sm:max-w-lg object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
