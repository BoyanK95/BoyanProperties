import { Link } from "react-router-dom";

const CreateListingsBtn = () => {
  return (
    <Link
      className="bg-green-700 text-white uppercase p-3 rounded-lg text-center hover:opacity-95"
      to={"/create-listing"}
    >
      Create listing
    </Link>
  );
};

export default CreateListingsBtn;
