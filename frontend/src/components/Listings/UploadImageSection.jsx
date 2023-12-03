import { useState } from "react";
import PropTypes from "prop-types";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const UploadImageSection = ({ formData, setFormData, isUploading, setIsUploading }) => {
  const [files, setFiles] = useState([]);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);
  const [imageUploadError, setImageUploadError] = useState("");

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length < 7) {
      setIsUploading(true);

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        promises.push(storeImage(element));
      }

      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });
          setImageUploadError(false);
          setIsUploading(false);
        })
        .catch((error) => {
          setImageUploadError(error);
          setIsUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing!");
      setIsUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
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
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  return (
    <>
      <p className="font-semibold">Images:</p>
      <span className="font-normal text-gray-600 ml-3">
        The first image will be the cover (max 6)
      </span>
      <div>
        <div className="flex gap-4">
          <input
            className="p-3 border border-gray-300 rounded w-full"
            onChange={(e) => setFiles(e.target.files)}
            type="file"
            name="images"
            id="images"
            accept="image/*"
            multiple
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            disabled={isUploading}
            className="p-3 text-green-700 border border-green-700 rounded-xl uppercase hover:shadow-lg hover:bg-green-700 hover:text-white disabled:opacity-70"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <div>
          {fileUploadPercent > 0 && fileUploadPercent < 100 && (
            <p className="text-green-700 text-sm">{`Uploading ${fileUploadPercent}% done`}</p>
          )}
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
        </div>
      </div>
    </>
  );
};

UploadImageSection.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  setIsUploading: PropTypes.func.isRequired,
};

export default UploadImageSection;
