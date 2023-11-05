import ProfileAvatar from "../components/ProfileAvatar";
import { useUserCtx } from "../context/userCtx";

function Profile() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* {userState.currentUser?.avatar ? (
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            src={userState.currentUser.avatar}
            alt="profile-picture"
            onError={(e) => (e.target.src = autoProfilePicString)}
          />
        ) : (
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            src={autoProfilePicString}
            alt="aut-profile-picture"
          />
        )} */}
        <ProfileAvatar />
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg m-3"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg m-3"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg m-3"
        />
      </form>
    </div>
  );
}

export default Profile;
