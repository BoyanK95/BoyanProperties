import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    offer: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchData({ ...searchData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sortOrder") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };

  /** Get searchData from URL */
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const offerFromUrl = urlParams.get("offer");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      offerFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("type", searchData.type);
    urlParams.set("parking", searchData.parking);
    urlParams.set("offer", searchData.offer);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <label className="whitespace-nowrap font-semibold" htmlFor="searchTerm">
          Search Term:
        </label>
        <input
          className="border rounded-lg p-3 w-full"
          type="text"
          name="searchTerm"
          id="searchTerm"
          value={searchData.searchTerm}
          onChange={handleChange}
          placeholder="Search..."
        />
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <label className="font-semibold" htmlFor="type">
          Type:
        </label>
        <div>
          <input
            className="w-5"
            type="checkbox"
            name="all"
            id="all"
            onChange={handleChange}
            checked={searchData.type === "all"}
          />
          <span>Rent & Sale</span>
        </div>
        <div>
          <input
            className="w-5"
            type="checkbox"
            name="rent"
            id="rent"
            onChange={handleChange}
            checked={searchData.type === "rent"}
          />
          <span>Rent</span>
        </div>
        <div>
          <input
            className="w-5"
            type="checkbox"
            name="sale"
            id="sale"
            onChange={handleChange}
            checked={searchData.type === "sale"}
          />
          <span>Sale</span>
        </div>
        <div>
          <input
            className="w-5"
            type="checkbox"
            name="offer"
            id="offer"
            onChange={handleChange}
            checked={searchData.offer}
          />
          <span>Offer</span>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <label className="font-semibold" htmlFor="amenities">
          Amenities:
        </label>
        <div>
          <input
            className="w-5"
            type="checkbox"
            name="parking"
            id="parking"
            onChange={handleChange}
            checked={searchData.parking}
          />
          <span>Parking</span>
        </div>
        <div>
          <input
            className="w-5"
            type="checkbox"
            name="furnished"
            id="furnished"
            onChange={handleChange}
            checked={searchData.furnished}
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
          onChange={handleChange}
          defaultValue={"createdAt_desc"}
        >
          <option value="regularPrice_desc">Price hight to low</option>
          <option value="regularPrice_asc">Price low to hight</option>
          <option value="createdAt_desc">Latest</option>
          <option value="createdAt_asc">Oldest</option>
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
