import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { useUserCtx } from "../context/userCtx";

function CreateListings() {
  const { userState } = useUserCtx();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 1,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [formError, setFormError] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
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

  const deleteUploadedImage = (url) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((imgUrl) => imgUrl !== url),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setFormError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setFormError("Discount price must be lower than regular price");
      setIsFormLoading(true);
      setFormError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: userState.currentUser._id,
        }),
      });
      const data = await res.json();
      setIsFormLoading(false);
      if (data.success === false) {
        setFormError(data.message);
      }
    } catch (error) {
      setFormError(error.message);
      setIsFormLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            onChange={handleChange}
            value={formData.name}
            className="border p-3 rounded-lg"
            type="text"
            id="name"
            placeholder="Name"
            minLength="4"
            maxLength="62"
            required
          />
          <textarea
            onChange={handleChange}
            value={formData.description}
            className="border p-3 rounded-lg"
            type="text"
            id="description"
            placeholder="Description"
            minLength="10"
            maxLength="62"
            required
          />
          <input
            onChange={handleChange}
            value={formData.address}
            className="border p-3 rounded-lg"
            type="text"
            id="address"
            placeholder="Address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "sale"}
                type="checkbox"
                name="sale"
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "rent"}
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.parking === true}
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.furnished}
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.offer}
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-7">
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bedrooms}
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min="1"
                max="15"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min="1"
                max="15"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.regularPrice}
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="regularPrice"
                min="1"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.discountedPrice}
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="discountPrice"
                min="1"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        {/* Upload IMG SECTION */}
        <div className="flex flex-col gap-4 flex-1">
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
              <p className="text-red-700">
                {imageUploadError && imageUploadError}
              </p>
            </div>
          </div>
          {formData.imageUrls?.length > 0 &&
            formData.imageUrls?.map((url, idx) => (
              <div
                className="flex justify-between p-3 hover:shadow-md rounded-lg"
                key={idx}
              >
                <img
                  src={url}
                  alt="apartment-image"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => deleteUploadedImage(url)}
                  type="button"
                  className="text-red-700 border p-5 border-spacing-6 border-red-600 font-bold uppercase rounded-lg hover:opacity-80 hover:bg-red-700 hover:text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-70"
          >
            {isFormLoading ? "Loading..." : "Create Listing"}
          </button>
          {formError && <p className="text-red-700 text-sm">{formError}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListings;
