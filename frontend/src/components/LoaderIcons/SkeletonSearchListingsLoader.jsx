import Skeleton from "react-loading-skeleton";

const SkeletonSearchListingCard = () => {
  return (
    <div className="bg-white shadow-md overflow-hidden rounded-lg w-full sm:w-[330px]">
      <div className="skeleton-wrapper">
        <Skeleton height={320} className="w-full object-cover" />
      </div>
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="truncate text-lg font-semibold text-slate-600">
          <Skeleton width={150} />
        </p>
        <div className="flex items-center gap-1 p-3 m-3">
          <p className="text-sm text-gray-600 truncate w-full">
            <Skeleton count={2} />
          </p>
        </div>
        <p className="text-slate-500 mt-2 font-semibold text-center">
          <Skeleton width={100} />
        </p>
        <div className="text-slate-700 flex gap-4 justify-center">
          <div className="font-bold text-sm p-3">
            <Skeleton width={50} />
          </div>
          <div className="font-bold text-sm p-3">
            <Skeleton width={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSearchListingCard;
