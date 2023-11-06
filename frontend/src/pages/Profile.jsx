import { useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";

function Profile() {
  const [formData, setFormData] = useState({});

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
          onChange={(e) => e.target.value}
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg m-3"
        />
        <input
          onChange={(e) => e.target.value}
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg m-3"
        />
        <input
          onChange={(e) => e.target.value}
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
