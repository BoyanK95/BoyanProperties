import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper";
import "swiper/css/bundle";

// Skeleton placeholder for the image
const SkeletonImage = () => (
  <div className="h-[500px] w-full bg-gray-400 animate-pulse"></div>
);

// Skeleton placeholder for the Swiper component
const SkeletonSwiper = () => (
  <Swiper>
    {Array.from({ length: 3 }).map((_, index) => (
      <SwiperSlide key={index}>
        <SkeletonImage />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default SkeletonSwiper;
