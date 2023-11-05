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

export default function ProfileAvatar({ setFormData, formData }) {
  const { userState } = useUserCtx();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");

  console.log("UploadedFile", file);
  console.log(fileUploadPercent);
  console.log('formData', formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
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
      },
      (error) => setFileUploadError(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

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
