import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  console.log(searchTerm);
  return (
    <form
      className="bg-slate-100 p-3 rounded-lg flex items-center"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-transparent focus:outline-none w-full sm:64"
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <button type="submit">
        <FaSearch className="text-slate-500" />
      </button>
    </form>
  );
};

export default Searchbar;
