import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        if (data.success === false) {
          setHasError(true);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setListing(data);
        setHasError(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };
    fetchListing();
  }, []);

  return <div>Listing</div>;
};

export default Listing;
