import { useEffect, useRef, useState } from "react";
import { useUserCtx } from "../context/userCtx";
import { autoProfilePicString } from "../assets/autoProfilePic";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

// eslint-disable-next-line react/prop-types
export default function ProfileAvatar({ setFormData, formData }) {
  const { userState } = useUserCtx();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload ${progress}% done`);
        setFileUploadPercent(Math.round(progress));
        setFileUploadError(false);
      },
      () => setFileUploadError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setFileUploadError(false);
        });
      }
    );
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/*"
        onClick={(e) => setFile(e.target.files[0])}
      />
      {userState.currentUser?.avatar ? (
        <img
          onClick={() => fileRef.current && fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          // eslint-disable-next-line react/prop-types
          src={formData.avatar || userState.currentUser.avatar || userState.currentUser._doc.avatar}
          onError={(e) =>
          // eslint-disable-next-line react/prop-types
            (e.target.src = formData.avatar || autoProfilePicString)
          }
          alt="profile-picture"
        />
      ) : (
        <img
          onClick={() => fileRef.current && fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          // eslint-disable-next-line react/prop-types
          src={formData.avatar || autoProfilePicString}
          alt="aut-profile-picture"
        />
      )}
      {fileUploadError && (
        <p className="text-red-800 self-center">Error image upload!</p>
      )}
      {fileUploadPercent > 0 && fileUploadPercent < 100 && (
        <p className="text-slate-700 self-center">{`Uploading ${fileUploadPercent}%`}</p>
      )}
      {fileUploadPercent === 100 && (
        <p className="text-green-700 self-center">
          Image uploaded succesfully!
        </p>
      )}
    </>
  );
}
