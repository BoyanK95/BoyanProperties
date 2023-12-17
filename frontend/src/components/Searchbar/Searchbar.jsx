import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  console.log(searchTerm);
  return (
    <form className="bg-slate-100 p-3 rounded-lg flex items-center">
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
