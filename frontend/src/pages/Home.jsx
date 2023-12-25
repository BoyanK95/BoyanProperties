import { useEffect, useState } from "react";
import TopHomeComponent from "../components/HomeComponents/TopHomeComponent";
import { useUserCtx } from "../context/userCtx";
import SwiperComponent from "../components/SwiperComponent/SwiperComponent";

function Home() {
  // const { userState } = useUserCtx();
  const [offerListings, setOfferListings] = useState([]);
  const [offerListingsError, setOfferListingsError] = useState("");
  const [saleListings, setSaleListings] = useState([]);
  const [saleListingsError, setSaleListingsErrpr] = useState("");
  const [rentListings, setRentListings] = useState([]);
  const [rentListingsError, setRentListingsError] = useState("");

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?offer=true&limit=4`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setOfferListingsError(data.message);
        }
        setOfferListings(data);
      } catch (error) {
        setOfferListingsError(error);
      }
    };

    fetchOfferListings();
  }, []);

  console.log(offerListings);
  return (
    <main>
      <TopHomeComponent />
      {offerListings && <SwiperComponent listingsArr={offerListings} />}
    </main>
  );
}

export default Home;
