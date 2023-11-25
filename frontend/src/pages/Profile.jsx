import { useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import { useUserCtx } from "../context/userCtx";
import { Link } from "react-router-dom";

function Profile() {
  const {
    userState,
    updateStart,
    updateSuccess,
    updateFail,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFail,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFail,
  } = useUserCtx();

  const currentUser = userState.currentUser;
  const [formData, setFormData] = useState({});
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [isListingsLoading, setIsListingsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateStart();
      const res = await fetch(
        `/api/user/update/${currentUser._id || currentUser._doc._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        updateFail(data.message);
        return;
      }
      updateSuccess(data);
      setUpdatedSuccessfully(true);
    } catch (error) {
      updateFail(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      deleteUserStart();
      const res = await fetch(
        `/api/user/delete/${currentUser._id || currentUser._doc._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success === false) {
        deleteUserFail(data.message);
        return;
      }
      deleteUserSuccess();
    } catch (error) {
      deleteUserFail(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      signOutUserStart();
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) return signOutUserFail(data.message);
      signOutUserSuccess();
    } catch (error) {
      signOutUserFail(error.message);
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      setIsListingsLoading(true);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      console.log(data);
      setIsListingsLoading(false);
      if (data.success === false) {
        return setShowListingsError(true);
      }
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <ProfileAvatar setFormData={setFormData} formData={formData} />
        <input
          onChange={handleChange}
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username || currentUser._doc.username}
          className="border p-3 rounded-lg m-3"
        />
        <input
          onChange={handleChange}
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email || currentUser._doc.email}
          className="border p-3 rounded-lg m-3"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg m-3"
        />
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase disabled:opacity-70 hover:opacity-90"
          disabled={userState.loading}
        >
          {userState.loading ? "Loading" : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white uppercase p-3 rounded-lg text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer font-bold hover:opacity-80"
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer font-bold hover:opacity-80"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">
        {userState.error ? userState.error : ""}
      </p>
      <p className="text-green-700 mt-5">
        {updatedSuccessfully ? "User updated succesfully!" : ""}
      </p>
      <button
        onClick={handleShowListings}
        className="text-green-700 w-full border rounded-lg p-2 border-green-500 hover:bg-green-600 hover:text-white hover:shadow-lg"
      >
        {isListingsLoading ? "Loading..." : "Show my listings"}
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error show listings!" : ""}
      </p>
    </div>
  );
}

export default Profile;
