import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

const SwiperComponent = ({ listing }) => {
  SwiperCore.use([Navigation, Autoplay, EffectFade, Pagination]);

  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      className="mySwiper"
    >
      {listing.imageUrls.map((url, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[550px] w-full object-cover"
            style={{
              background: `url(${url}) center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

SwiperComponent.propTypes = {
    listing: PropTypes.object.isRequired,
  };
  

export default SwiperComponent;
