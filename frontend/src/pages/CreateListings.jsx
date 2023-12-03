import { useState } from "react";
import { useUserCtx } from "../context/userCtx";
import { useNavigate } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import UploadImageSection from "../components/UploadImageSection";
import ListingInputs from "../components/ListingInputs";

function CreateListings() {
  const { userState } = useUserCtx();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [formError, setFormError] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setFormError("You must upload at least one image!");
      if (+formData.regularPrice < +formData.discountPrice)
        return setFormError("Discount price must be lower than regular price!");
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

      navigate(`/listings/${data._id}`);
    } catch (error) {
      setFormError(error.message);
      setIsFormLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <ListingInputs formData={formData} setFormData={setFormData} />
        <div className="flex flex-col gap-4 flex-1">
          <UploadImageSection
            formData={formData}
            setFormData={setFormData}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
          {formData.imageUrls?.length > 0 &&
            formData.imageUrls?.map((url, idx) => (
              <ImageCard
                key={idx}
                formData={formData}
                setFormData={setFormData}
                imageUrl={url}
              />
            ))}
          <button
            disabled={isFormLoading || isUploading}
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
