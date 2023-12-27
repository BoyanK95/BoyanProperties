import Skeleton from "react-loading-skeleton";

const ListingsSkeletonLoader = () => {
  return (
    <div>
      <div className="my-5">
        <h2 className="text-2xl font-semibold text-slate-600">
          <Skeleton width={150} height={20} />
        </h2>
        <div className="text-sm text-blue-700">
          <Skeleton width={100} height={15} />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <Skeleton height={200} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsSkeletonLoader;
