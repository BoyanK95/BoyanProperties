import { Bars } from "react-loading-icons";

const LoadingBars = () => {
  return (
    <div className="flex items-center justify-center my-10">
    <Bars
      stroke="#708090"
      strokeOpacity={0.55}
      fill="#A3A8A8"
      height="350"
      width="350"
    />
  </div>
  )
}

export default LoadingBars