import { useState } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import ErrorState from "../components/ErrorState/ErrorState";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = () => {
    window.location.reload();
    setHasError(false);
    setIsLoading(false);
  };

  console.log("=============");
  console.log(listings);
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
            />
          </div>
          {!isLoading && listings.length === 0 && (
            <div className="flex-1">
              <p className="text-3xl p-3 text-slate-700 text-center mt-5 items-center font-semibold">
                No listings found!
              </p>
            </div>
          )}
          {!isLoading && listings.length > 0 && (
            <div className="flex-1">
              <h1 className="text-3xl font-semibold border-b h-full p-3 text-slate-700 text-center items-center mt-2">
                Listing results:
              </h1>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Search;
