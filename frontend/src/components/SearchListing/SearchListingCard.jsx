import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { defaultHousePic } from "../../assets/defaultHouseListingPic";

const SearchListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-110 trnasition-scale duration-300"
          src={listing.imageUrls[0] || defaultHousePic}
          alt="listing-cover"
        />
      </Link>
    </div>
  );
};

SearchListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default SearchListingCard;
