import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SearchListingCard from "../SearchListing/SearchListingCard";
import ListingsSkeletonLoader from "./ListingsSkeletonLoader";

const Listings = ({
  listingsArr,
  listingsHeader,
  listingLink,
  listingsLinkContent,
}) => {
    
  if (!listingsArr.length) {
    return <ListingsSkeletonLoader />;
  }

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
