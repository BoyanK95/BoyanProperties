import React from 'react'
import { useUserCtx } from '../context/userCtx';
import { autoProfilePicString } from '../assets/autoProfilePic';

export default function ProfileAvatar() {
  const { userState } = useUserCtx();


  return (
    userState.currentUser?.avatar ? (
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={userState.currentUser.avatar}
          alt="profile-picture"
        //   onError={(e) => (e.target.src = autoProfilePicString)}
        />
      ) : (
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={autoProfilePicString}
          alt="aut-profile-picture"
        />
      )
  )
}
