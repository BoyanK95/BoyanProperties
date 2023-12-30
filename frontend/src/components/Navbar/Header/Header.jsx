import { Link } from "react-router-dom";
import { useUserCtx } from "../../../context/userCtx";
import { autoProfilePicString } from "../../../assets/autoProfilePic";
import Searchbar from "../Searchbar/Searchbar";
import { headerImg } from "../../../assets/headerImgAddress";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { ImCross } from "react-icons/im";

function Header() {
  const { userState, signOutUserStart, signOutUserSuccess, signOutUserFail } =
    useUserCtx();
  const [showLinks, setShowLinks] = useState(false);

  const toggleHamburger = () => {
    setShowLinks(!showLinks);
  };

  const closeHamburger = () => {
    setShowLinks(false);
  };

  const handleSignOut = async () => {
    closeHamburger();
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
  console.log(window.innerWidth);

  const MobileLinksComponent = () => {
    return (
      <ul className="flex flex-col gap-4 sm:right-64 bg-slate-100 shadow-lg rounded-md absolute right-0 p-3 z-50 top-12">
        {userState.currentUser && (
          <Link to="profile">
            <li className="text-slate-700" onClick={closeHamburger}>
              Profile
            </li>
          </Link>
        )}
        <Link to="about">
          <li className="text-slate-700 sm:inline" onClick={closeHamburger}>
            About
          </li>
        </Link>
        {userState.currentUser && (
          <li className="text-slate-700" onClick={handleSignOut}>
            Sign Out
          </li>
        )}
        {!userState.currentUser && (
          <Link to="sign-in">
            <li className=" text-slate-700" onClick={closeHamburger}>
              Sign in
            </li>
          </Link>
        )}
      </ul>
    );
  };

  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <div className="flex">
              <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                <span className="text-slate-700 hidden sm:inline">
                  Property
                </span>
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
              <>
                <Link to="sign-in">
                  <li className="hidden sm:inline text-slate-700 hover:underline">
                    Sign in
                  </li>
                </Link>
                {!showLinks ? (
                  <GiHamburgerMenu
                    className="sm:hidden mr-3"
                    onClick={toggleHamburger}
                  />
                ) : (
                  <ImCross
                    className="sm:hidden mr-3"
                    onClick={closeHamburger}
                  />
                )}
              </>
            ) : userState.currentUser.avatar ? (
              window.innerWidth >= 640 ? (
                <Link to={"profile"} className="hidden sm:inline">
                  <img
                    className="rounded-full h-8 w-8 object-cover"
                    src={userState.currentUser.avatar}
                    alt="profile-picture"
                    onError={(e) => (e.target.src = autoProfilePicString)}
                  />
                </Link>
              ) : (
                <img
                  onClick={toggleHamburger}
                  className="rounded-full h-8 w-8 object-cover"
                  src={userState.currentUser.avatar}
                  alt="profile-picture"
                  onError={(e) => (e.target.src = autoProfilePicString)}
                />
              )
            ) : (
              <Link className="hidden sm:inline">
                <img
                  // onClick={toggleHamburger}
                  className="rounded-full h-8 w-8 object-cover"
                  src={autoProfilePicString}
                  alt="auto-profile-picture"
                />
              </Link>
            )}
          </ul>
        </div>
      </header>
      {showLinks && <MobileLinksComponent />}
    </>
  );
}

export default Header;
