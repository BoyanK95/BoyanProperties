import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loading-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation, Autoplay]);

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
      {isLoading && (
        <div className="flex items-center justify-center my-10">
          <Bars
            stroke="#708090"
            strokeOpacity={0.55}
            fill="#A3A8A8"
            height="350"
            width="350"
          />
        </div>
      )}
      {hasError && (
        <div className="text-center my-10">
          <p className="text-2xl font-bold">Something went wrong!</p>
          <button
            onClick={handleRetry}
            className="mt-4 py-2 px-4 border-3 rounded-lg text-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors"
            style={{ borderColor: 'currentColor' }}
          >
            Retry
          </button>
        </div>
      )}
      {listing && !isLoading && !hasError && (
        <>
          <Swiper navigation>
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
        </>
      )}
    </main>
  );
};

export default Listing;
