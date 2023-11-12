import { useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import { useUserCtx } from "../context/userCtx";

function Profile() {
  const { userState } = useUserCtx();
  const [formData, setFormData] = useState({});
  const currentUser = userState.currentUser;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.target.preventDefault();
    //TODO formSubmit
    console.log(e);
  };

  console.log("formData", formData);
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
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg m-3"
        />
        <input
          onChange={handleChange}
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg m-3"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg m-3"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase disabled:opacity-70 hover:opacity-90">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-bold hover:opacity-80">
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer font-bold hover:opacity-80">
          Sign out
        </span>
      </div>
    </div>
  );
}

export default Profile;
