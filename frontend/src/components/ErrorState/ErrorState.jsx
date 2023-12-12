import PropTypes from "prop-types";

const ErrorState = ({ handleRetry }) => {
  return (
    <div className="text-center my-10">
      <p className="text-2xl font-bold">Something went wrong!</p>
      <button
        onClick={handleRetry}
        className="mt-4 py-2 px-7 border-3 bg-slate-300 shadow-md rounded-lg text-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors"
        style={{ borderColor: "currentColor" }}
      >
        Retry
      </button>
    </div>
  );
};

ErrorState.propTypes = {
  handleRetry: PropTypes.func.isRequired,
};

export default ErrorState;
