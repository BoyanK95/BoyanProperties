import { pageTitle } from "../../constants/pageTitle";
import {Link} from 'react-router-dom'

const TopHomeComponent = () => {
  return (
    <div className="flex flex-col gap-3 max-w-6xl mx-auto mt-7 pl-3">
      <h1 className="text-slate-700 text-3xl lg:text-6xl font-bold">
        Find your next <span className="text-slate-500">perfect</span>
        <br />
        place with ease!
      </h1>
      <div className='mt-5'>
        <p>{pageTitle} is the best place to find your next perfect place to live</p>
        <br />
        <p>We have a wide arays of properties to chose from.</p>
      </div>
      <Link to={'/search'} className="text-blue-700 p-3 mt-10">
        Let`s Start now ...
      </Link>
    </div>
  );
};

export default TopHomeComponent;
