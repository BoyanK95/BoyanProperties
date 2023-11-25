import React from "react";
import { Link } from "react-router-dom";

const UserListings = ({userListings}) => {

  const deleteListing = (id) => {
    console.log(id);
  };

  const editListing = (id) => {
    console.log(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
      {userListings.map((listing) => (
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
            <button
              onClick={() => editListing(listing._id)}
              type="button"
              className="text-green-700 font-bold uppercase hover:opacity-80"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListings;
