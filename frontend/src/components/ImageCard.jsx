import PropTypes from "prop-types";

const ImageCard = ({ formData, setFormData, url, idx }) => {
  const deleteUploadedImage = (url) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((imgUrl) => imgUrl !== url),
    });
  };

  return (
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
  );
};

ImageCard.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
};

export default ImageCard;
