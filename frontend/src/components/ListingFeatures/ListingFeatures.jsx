import PropTypes from "prop-types";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";

function ListingFeatures({ listing }) {
  return (
    <ul className="text-green-900 text-sm font-semibold flex flex-wrap items-center gap-4 sm:gap-6">
      <li className="flex items-center gap-1 whitespace-nowrap">
        <FaBed className="text-lg" />
        {listing.bedrooms > 1
          ? ` ${listing.bedrooms} beds`
          : ` ${listing.bedrooms} bed`}
      </li>
      <li className="flex items-center gap-1 whitespace-nowrap">
        <FaBath className="text-lg" />
        {listing.bathrooms > 1
          ? ` ${listing.bathrooms} bathrooms`
          : ` ${listing.bathrooms} bathroom`}
      </li>
      <li className="flex items-center gap-1 whitespace-nowrap">
        <FaParking className="text-lg" />
        {listing.parking ? "Parking spot" : "No Parking"}
      </li>
      <li className="flex items-center gap-1 whitespace-nowrap">
        <FaChair className="text-lg" />
        {listing.furnished ? "Furnished" : "Unfurnished"}
      </li>
    </ul>
  );
}

ListingFeatures.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingFeatures;
