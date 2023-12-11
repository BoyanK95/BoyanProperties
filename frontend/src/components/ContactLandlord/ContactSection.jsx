import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactSection = ({ listing }) => {
  const [landlord, setLandlord] = useState();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setIsLoading(false);
        if (data.success === false) {
          setHasError(true);
          return;
        }
        setLandlord(data);
        setHasError(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && !isLoading && !hasError && (
        <div className="flex flex-col gap-2 mt-3">
          <p>
            Contact{" "}
            <span className="font-semibold text-slate-700">
              {landlord.username}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-slate-700">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea
            className="border rounded-lg shadow-lg p-3 w-full"
            name="message"
            id="message"
            rows="3"
            placeholder="Enter you message here..."
            onChange={handleChange}
            value={message}
          ></textarea>
          <Link
            className="bg-slate-300 mt-1 border rounded-lg text-center p-3 hover:bg-blue-700 hover:text-white hover:shadow-md font-semibold uppercase"
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

ContactSection.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ContactSection;
