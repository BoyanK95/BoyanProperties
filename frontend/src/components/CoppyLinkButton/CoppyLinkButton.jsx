import { useState } from "react";
import { FaShare } from "react-icons/fa";

const CoppyLinkButton = () => {
  const [isCoppied, setIsCoppied] = useState(false);

  const handleCoppyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCoppied(true);
    setTimeout(() => {
      setIsCoppied(false);
    }, 2000);
  };

  return (
    <>
      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:shadow-md">
        <FaShare className="text-slate-500" onClick={handleCoppyLink} />
      </div>
      {isCoppied && (
        <p className="fixed top-[19%] right-[2%] z-10 rounded-md bg-slate-100 p-2">
          Link coppied!
        </p>
      )}
    </>
  );
};

export default CoppyLinkButton;
