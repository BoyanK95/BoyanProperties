import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loading-icons";

const Listing = () => {
  const [listing, setListing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
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
    };
    fetchListing();
  }, []);

  return (
    <main>
      {isLoading && (
        <div className="flex items-center justify-center mt-10">
          <Bars
            stroke="#708090"
            strokeOpacity={0.75}
            fill="#A3A8A8"
            height="250"
            width="250"
          />
        </div>
      )}
    </main>
  );
};

export default Listing;
