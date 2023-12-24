import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { defaultHousePic } from "../../assets/defaultHouseListingPic";
import { currency } from "../../constants/currency";

const SearchListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-110 trnasition-scale duration-300"
          src={listing.imageUrls[0] || defaultHousePic}
          alt="listing-cover"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-600">
            {listing.name}
          </p>
          <div className="flex items-center gap-1 p-3 m-3">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
            <p className="text-gray-600 text-sm line-clamp-2">
              {listing.description}
            </p>
          </div>
          <p className="text-slate-500 mt-2 font-semibold text-center">
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent"
              ? ` ${currency.EU} / month`
              : ` ${currency.EU}`}
          </p>
          <div className="text-slate-700 flex gap-4 justify-center">
            <div className="font-bold text-sm p-3">
              <p>
                {listing.bedrooms === 1 ? "1 bed" : `${listing.bedrooms} beds`}
              </p>
            </div>
            <div className="font-bold text-sm p-3">
              <p>
                {listing.bathrooms === 1
                  ? "1 bath"
                  : `${listing.bathrooms} baths`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

SearchListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default SearchListingCard;
