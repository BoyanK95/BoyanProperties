import { useState } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import ErrorState from "../components/ErrorState/ErrorState";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(listings);

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(false)
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
            />
          </div>
          <div className="text-3xl font-semibold border-b p-3 text-slate-700 text-center items-center mt-2">
            <h1>Listing results:</h1>
          </div>
        </>
      )}
    </main>
  );
};

export default Search;
