import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import LoadingBars from "../components/LoaderIcons/LoadingBars";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import ErrorState from "../components/ErrorState/ErrorState";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import CoppyLinkButton from "../components/CoppyLinkButton/CoppyLinkButton";

const Listing = () => {
  SwiperCore.use([Navigation, Autoplay, EffectFade, Pagination]);

  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const params = useParams();

  const fetchListing = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      console.log(data);
      setIsLoading(false);
      if (data.success === false) {
        setHasError(true);
        return;
      }
      setListing(data);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [params.listingId]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(false);
    fetchListing();
  };

  return (
    <main>
      {isLoading && <LoadingBars />}
      {hasError && <ErrorState handleRetry={handleRetry} />}
      {listing && !isLoading && !hasError && (
        <>
          <CoppyLinkButton />
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
                  className="h-[600px] w-full object-cover"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} -{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " /month"}
            </p>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
