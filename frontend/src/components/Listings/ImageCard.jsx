import PropTypes from "prop-types";

const ImageCard = ({ formData, setFormData, imageUrl }) => {
  const deleteUploadedImage = (imageUrl) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url) => url !== imageUrl),
    });
  };

  return (
    <div className="flex justify-between p-3 hover:shadow-md rounded-lg">
      <img
        src={imageUrl}
        alt="apartment-image"
        className="w-20 h-20 object-cover rounded-lg"
      />
      <button
        onClick={() => deleteUploadedImage(imageUrl)}
        type="button"
        className="text-red-700 border p-5 border-spacing-6 border-red-600 font-bold uppercase rounded-lg hover:opacity-80 hover:bg-red-700 hover:text-white"
      >
        Delete
      </button>
    </div>
  );
};

ImageCard.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ImageCard;
