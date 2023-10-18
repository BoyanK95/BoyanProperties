import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Koychevs</span>
          <span className="text-slate-500">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:64"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-500" />
        </form>
      </div>
    </header>
  );
}

export default Header;
