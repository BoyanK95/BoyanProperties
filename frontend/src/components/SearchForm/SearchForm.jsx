

const SearchForm = () => {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <label className="whitespace-nowrap font-semibold" htmlFor="searchTerm">
          Search Term:
        </label>
        <input
          className="border rounded-lg p-3 w-full"
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="Search..."
        />
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <label className="font-semibold" htmlFor="type">
          Type:
        </label>
        <div>
          <input className="w-5" type="checkbox" name="all" id="all" />
          <span>Rent & Sale</span>
        </div>
        <div>
          <input className="w-5" type="checkbox" name="rent" id="rent" />
          <span>Rent</span>
        </div>
        <div>
          <input className="w-5" type="checkbox" name="sale" id="sale" />
          <span>Sale</span>
        </div>
        <div>
          <input className="w-5" type="checkbox" name="offer" id="offer" />
          <span>Offer</span>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <label className="font-semibold" htmlFor="amenities">
          Amenities:
        </label>
        <div>
          <input className="w-5" type="checkbox" name="parking" id="parking" />
          <span>Parking</span>
        </div>
        <div>
          <input
            className="w-5"
            type="checkbox"
            name="furnished"
            id="furnished"
          />
          <span>Furnished</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="font-semibold" htmlFor="sort">
          Sort:
        </label>
        <select
          className="border rounded-lg p-2 text-center"
          name="sortOrder"
          id="sortOrder"
        >
          <option value="price-hight-to-low">Price hight to low</option>
          <option value="price-low-to-hight">Price low to hight</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <button
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-blue-600 disabled:bg-slate-500 font-semibold"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
