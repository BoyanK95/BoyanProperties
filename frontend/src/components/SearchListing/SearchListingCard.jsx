import PropTypes from "prop-types";

const SearchListingCard = ({ listing }) => {
  return <p>{listing.name}</p>;
};

SearchListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default SearchListingCard;
