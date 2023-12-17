import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <form className="bg-slate-100 p-3 rounded-lg flex items-center">
      <input
        className="bg-transparent focus:outline-none w-full sm:64"
        type="text"
        placeholder="Search..."
      />
      <FaSearch className="text-slate-500" />
    </form>
  );
};

export default Searchbar;
