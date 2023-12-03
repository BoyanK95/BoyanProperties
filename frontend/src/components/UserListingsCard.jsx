import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Circles } from "react-loading-icons";

const UserListingsCard = ({ userListings, setUserListings }) => {
  const [deleteListingError, setDeleteListingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deleteListing = async (id) => {
    try {
      setDeleteListingError("");
      setIsLoading(true);
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.success === false) {
        return setDeleteListingError(data.message);
      }
      setUserListings(userListings.filter((listing) => listing._id !== id));
    } catch (error) {
      setDeleteListingError(error.message);
    }
  };


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
      {deleteListingError && (
        <p className="text-red-700 text-center mt-5">{deleteListingError}</p>
      )}
      {!isLoading ? (
        userListings.map((listing) => (
          <div
            key={listing._id}
            className="flex justify-between p-3 m-3 border hover:shadow-lg rounded-lg"
          >
            <Link to={`/listings/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt="listing-image"
                className="w-20 h-20 object-cover rounded-lg"
              />
            </Link>
            <Link to={`/listings/${listing._id}`}>
              <h3 className="font-bold">{listing.name}</h3>
            </Link>
            <div className="inline-grid">
              <button
                onClick={() => deleteListing(listing._id)}
                type="button"
                className="text-red-700 font-bold uppercase hover:opacity-80"
              >
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button
                  type="button"
                  className="text-green-700 font-bold uppercase hover:opacity-80"
                >
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <Circles
            stroke="#708090"
            strokeOpacity={0.75}
            fill="#A3A8A8"
            height="90"
            width="90"
          />
        </div>
      )}
    </div>
  );
};

UserListingsCard.propTypes = {
  userListings: PropTypes.array.isRequired,
  setUserListings: PropTypes.func.isRequired
};

export default UserListingsCard;
