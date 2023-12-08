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
                  className="h-[580px] w-full object-cover"
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
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p>${+listing.regularPrice - +listing.discountPrice} OFF</p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description: </span>
              {listing.description}
            </p>
            <ul className="text-green-900 text-sm font-semibold flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? ` ${listing.bedrooms} beds`
                  : ` ${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? ` ${listing.bathrooms} bathrooms`
                  : ` ${listing.bathrooms} bathroom`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
