import { useEffect, useState } from "react";
import TopHomeComponent from "../components/HomeComponents/TopHomeComponent";
import SwiperComponent from "../components/SwiperComponent/SwiperComponent";
import Listings from "../components/HomeComponents/Listings";
import ErrorState from "../components/ErrorState/ErrorState";
import SkeletonSwiper from "../components/LoaderIcons/SkeletonSwiper";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [offerListingsLoading, setOfferListingsLoading] = useState(false);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [listingsError, setListingsError] = useState("");

  useEffect(() => {
    const fetchOfferListings = async () => {
      setOfferListingsLoading(true);
      try {
        const res = await fetch(`/api/listing/search?offer=true&limit=3`);
        const data = await res.json();
        setOfferListingsLoading(false);
        if (data.success === false) {
          setListingsError(data.message);
        }
        setOfferListings(data);
      } catch (error) {
        setListingsError(error);
        setOfferListingsLoading(false);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?type=sale&limit=3`);
        const data = await res.json();
        if (data.success === false) {
          setListingsError(data.message);
        }
        setSaleListings(data);
      } catch (error) {
        setListingsError(error);
      }
    };

    const fetchRentalListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?type=rent&limit=3`);
        const data = await res.json();
        if (data.success === false) {
          setListingsError(data.message);
        }
        setRentListings(data);
      } catch (error) {
        setListingsError(error);
      }
    };
    fetchOfferListings();
    fetchRentalListings();
    fetchSaleListings();
  }, []);

  const handleRetry = () => {
    window.location.reload();
    setListingsError("");
    setOfferListingsLoading(false);
  };

  return (
    <main>
      <TopHomeComponent />
      {offerListings && !offerListingsLoading && (
        <SwiperComponent listingsArr={offerListings} />
      )}
      {offerListingsLoading && <SkeletonSwiper />}
      <div className="flex flex-col gap-8 my-10 p-3 mx-auto max-w-6xl">
        {offerListings &&
          !listingsError &&
          !offerListingsLoading &&
          !!offerListings.length > 0 && (
            <Listings
              listingsArr={offerListings}
              listingsHeader={"Recent offers"}
              listingLink={`/search?offer=true`}
              listingsLinkContent={"Show more offers"}
            />
          )}
        {saleListings && !listingsError && !!saleListings.length && (
          <Listings
            listingsArr={saleListings}
            listingsHeader={"Find a home to buy"}
            listingLink={"/search?type=sale"}
            listingsLinkContent={"Show more homes for sale"}
          />
        )}
        {rentListings && !listingsError && !!rentListings.length && (
          <Listings
            listingsArr={rentListings}
            listingsHeader={"Find a good place to rent"}
            listingLink={"/search?type=rent"}
            listingsLinkContent={"Show more properties for rent"}
          />
        )}
        {listingsError && <ErrorState handleRetry={handleRetry} />}
      </div>
    </main>
  );
}

export default Home;
