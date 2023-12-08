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
  FaShare,
} from "react-icons/fa";
import ErrorState from "../components/ErrorState/ErrorState";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation, Autoplay, EffectFade, Pagination]);

  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isCoppied, setIsCoppied] = useState(false);

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

  const handleCoppyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCoppied(true);
    setTimeout(() => {
      setIsCoppied(false);
    }, 2000);
  };

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
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:shadow-md">
            <FaShare className="text-slate-500" onClick={handleCoppyLink} />
          </div>
          {isCoppied && (
            <p className="fixed top-[19%] right-[2%] z-10 rounded-md bg-slate-100 p-2">
              Link coppied!
            </p>
          )}
        </>
      )}
    </main>
  );
};

export default Listing;
