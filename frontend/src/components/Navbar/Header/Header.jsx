import { Link } from "react-router-dom";
import { useUserCtx } from "../../../context/userCtx";
import { autoProfilePicString } from "../../../assets/autoProfilePic";
import Searchbar from "../Searchbar/Searchbar";
import { headerImg } from "../../../assets/headerImgAddress";

function Header() {
  const { userState } = useUserCtx();

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div className="flex">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-700 hidden sm:inline">Property</span>
              <span className="text-slate-500 hidden sm:inline">BG</span>
            </h1>
            <img className="h-9 ml-2" src={headerImg} alt="header-img" />
          </div>
        </Link>
        <Searchbar />
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          {!userState.currentUser ? (
            <Link to="sign-in">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign in
              </li>
            </Link>
          ) : userState.currentUser.avatar ? (
            <Link to="profile">
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={userState.currentUser.avatar}
                alt="profile-picture"
                onError={(e) => (e.target.src = autoProfilePicString)}
              />
            </Link>
          ) : (
            <Link to="profile">
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={autoProfilePicString}
                alt="auto-profile-picture"
              />
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
