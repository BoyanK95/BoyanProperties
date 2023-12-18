import SearchForm from "../components/SearchForm/SearchForm";

const Search = () => {
  return (
    <main className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <SearchForm />
      </div>
      <div className="text-3xl font-semibold border-b p-3 text-slate-700 mt-2">
        <h1>Listing results:</h1>
      </div>
    </main>
  );
};

export default Search;
