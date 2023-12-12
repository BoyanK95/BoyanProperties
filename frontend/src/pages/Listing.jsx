import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import LoadingBars from "../components/LoaderIcons/LoadingBars";
import CoppyLinkButton from "../components/CoppyLinkButton/CoppyLinkButton";
import ListingFeatures from "../components/ListingFeatures/ListingFeatures";
import { FaMapMarkerAlt } from "react-icons/fa";
import ErrorState from "../components/ErrorState/ErrorState";
import { useUserCtx } from "../context/userCtx";
import SwiperComponent from "../components/SwiperComponent/SwiperComponent";

const Listing = () => {
  const { userState } = useUserCtx();
  const currentUser = userState.currentUser;

  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const params = useParams();

  const fetchListing = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
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
          <SwiperComponent listing={listing} />
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} -{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")} {currency.EU}
              {listing.type === "rent" &&  ` / month`}
            </p>
            <p className="flex items-center mt-5 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {+listing.regularPrice - +listing.discountPrice} {currency.EU} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description: </span>
              {listing.description}
            </p>
            <ListingFeatures listing={listing} />
            {currentUser &&
              listing?.userRef !== currentUser._id &&
              !showContact && (
                <button
                  onClick={() => setShowContact(true)}
                  className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-90 mt-1"
                >
                  Contact landlord
                </button>
              )}
            {showContact && <ContactSection listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
