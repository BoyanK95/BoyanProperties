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
  }, [params.listingId]);

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
    </main>
  );
};

export default Listing;
