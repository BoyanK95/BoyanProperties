import React, { useRef, useState } from "react";
import { useUserCtx } from "../context/userCtx";
import { autoProfilePicString } from "../assets/autoProfilePic";

export default function ProfileAvatar() {
  const { userState } = useUserCtx();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  console.log(file);

  return userState.currentUser?.avatar ? (
    <>
      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/*"
        onClick={(e) => setFile(e.target.files[0])}
      />
      <img
        onClick={() => fileRef.current && fileRef.current.click()}
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        src={userState.currentUser.avatar}
        onError={(e) => (e.target.src = autoProfilePicString)}
        alt="profile-picture"
      />
    </>
  ) : (
    <>
      <input type="file" hidden ref={fileRef} />
      <img
        onClick={() => fileRef.current && fileRef.current.click()}
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        src={autoProfilePicString}
        alt="aut-profile-picture"
      />
    </>
  );
}
