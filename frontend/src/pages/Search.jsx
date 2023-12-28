import { useState } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import ErrorState from "../components/ErrorState/ErrorState";
import SearchListingCard from "../components/SearchListing/SearchListingCard";
import SkeletonSearchListingCard from "../components/LoaderIcons/SkeletonSearchListingsLoader";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreListings, setShowMoreListings] = useState(false);

  const onShowMoreListingsClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/search?${searchQuery}`);
    const data = await res.json();
    if (data.success === false) {
      setHasError(true);
    }
    if (data.length < 9) {
      setShowMoreListings(false);
    }
    setListings([...listings, ...data]);
  };

  const handleRetry = async () => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/search?${searchQuery}`);
    const data = await res.json();
    if (data.success === false) {
      setHasError(true);
    }
    setHasError(false);
    setIsLoading(false);
    setListings(data);
  };

  return (
    <main className="flex flex-col md:flex-row">
      {hasError && (
        <div className="flex items-center justify-center w-full h-full mt-7">
          <ErrorState handleRetry={handleRetry} />
        </div>
      )}
      {!hasError && (
        <>
          <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <SearchForm
              setHasError={setHasError}
              setListings={setListings}
              setIsLoading={setIsLoading}
              setShowMoreListings={setShowMoreListings}
            />
          </div>
          {!isLoading && listings.length === 0 && (
            <div className="flex-1">
              <p className="text-3xl p-3 text-slate-700 text-center mt-5 items-center font-semibold">
                No listings found!
              </p>
            </div>
          )}
          {listings.length > 0 && (
            <div className="flex-1">
              <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
                Listing results:
              </h1>
              <div className="p-7 flex flex-wrap gap-4">
                {isLoading &&
                  listings.map((_, idx) => (
                    <SkeletonSearchListingCard key={idx} />
                  ))}

                {!isLoading &&
                  listings &&
                  listings.map((listing) => (
                    <SearchListingCard key={listing._id} listing={listing} />
                  ))}

                {showMoreListings && (
                  <button
                    onClick={onShowMoreListingsClick}
                    className="text-green-700 hover:underline p-7 text-center w-full"
                  >
                    Show more
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Search;
