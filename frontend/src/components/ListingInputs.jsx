import PropTypes from "prop-types";

const ListingInputs = ({ formData, setFormData }) => {
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
            checked={formData.parking}
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
        {formData.offer && (
          <div className="flex items-center gap-2">
            <input
              onChange={handleChange}
              value={formData.discountedPrice}
              className="p-3 border-gray-300 rounded-lg"
              type="number"
              id="discountPrice"
              min="0"
              required
            />
            <div className="flex flex-col items-center">
              <p>Discounted price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ListingInputs.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ListingInputs;
