const SkeletonMessageLeader = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2 mt-3">
      <div className="h-5 bg-gray-300 rounded"></div>
      <div className="h-12 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonMessageLeader;
