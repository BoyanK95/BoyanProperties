function CreateListings() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg"
            type="text"
            id="name"
            placeholder="Name"
            minLength="10"
            maxLength="62"
            required
          />
          <textarea
            className="border p-3 rounded-lg"
            type="text"
            id="description"
            placeholder="Description"
            minLength="10"
            maxLength="62"
            required
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            id="address"
            placeholder="Address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-7">
            <div className="flex items-center gap-2">
              <input
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
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="discountedPrice"
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
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">Images:</p>
          <span className="font-normal text-gray-600 ml-3">
            The first image will be the cover (max 6)
          </span>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded-xl uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CreateListings;
