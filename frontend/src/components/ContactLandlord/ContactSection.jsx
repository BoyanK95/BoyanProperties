import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ContactSection = ({ listing }) => {
  const [landlord, setLandlord] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        console.log(data);
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
  console.log("landlord", landlord);

  return (
    <>
      {landlord && !isLoading && !hasError && (
        <div className="flex flex-col gap-2 mt-3">
          <p>
            Contact{" "}
            <span className="font-semibold text-slate-900">
              {landlord.username}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-slate-900">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea
          className="border rounded-lg shadow-lg p-3 w-full"
            name="message"
            id="message"
            rows="3"
            placeholder="Enter you message here..."
          ></textarea>
        </div>
      )}
    </>
  );
};

ContactSection.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ContactSection;
