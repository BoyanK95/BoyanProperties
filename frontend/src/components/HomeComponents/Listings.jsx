import { Link } from "react-router-dom";
// import SearchListingCard from "../components/SearchListing/SearchListingCard";
import PropTypes from "prop-types";
import SearchListingCard from "../SearchListing/SearchListingCard";

const Listings = ({
  listingsArr,
  listingsHeader,
  listingLink,
  listingsLinkContent,
}) => {
  return (
    <div>
      <div className="my-5">
        <h2 className="text-2xl font-semibold text-slate-600">
          {listingsHeader}
        </h2>
        <Link
          className="text-sm text-blue-700 hover:underline"
          to={listingLink}
        >
          {listingsLinkContent}
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {listingsArr.map((listing) => (
          <SearchListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

Listings.propTypes = {
  listingsArr: PropTypes.array.isRequired,
  listingsHeader: PropTypes.string,
  listingLink: PropTypes.string,
  listingsLinkContent: PropTypes.string,
};

export default Listings;
