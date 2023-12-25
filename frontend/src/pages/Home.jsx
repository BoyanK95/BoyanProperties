import { useEffect, useState } from "react";
import TopHomeComponent from "../components/HomeComponents/TopHomeComponent";
import { useUserCtx } from "../context/userCtx";
import SwiperComponent from "../components/SwiperComponent/SwiperComponent";
import SearchListingCard from "../components/SearchListing/SearchListingCard";
import { Link } from "react-router-dom";
import Listings from "../components/HomeComponents/Listings";

function Home() {
  // const { userState } = useUserCtx();
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [listingsError, setListingsError] = useState("");

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?offer=true&limit=3`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setListingsError(data.message);
        }
        setOfferListings(data);
      } catch (error) {
        setListingsError(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?type=sale&limit=3`);
        const data = await res.json();
        console.log(data);
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
        console.log(data);
        if (data.success === false) {
          setListingsError(data.message);
        }
        setRentListings(data);
      } catch (error) {
        setListingsError(error);
      }
    };
    fetchOfferListings();
  }, []);
  console.log(offerListings);

  return (
    <main>
      <TopHomeComponent />
      {offerListings && <SwiperComponent listingsArr={offerListings} />}
      <div className="flex flex-col gap-8 my-10 p-3 mx-auto max-w-6xl">
        {offerListings && offerListings.length > 0 && (
          <Listings
            listingsArr={offerListings}
            listingsHeader={"Recent offers"}
            listingsLinkContent={"Show more offers"}
          />
        )}
      </div>
    </main>
  );
}

export default Home;
