const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      {/* Title Placeholder */}
      <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
      {/* Text Lines */}
      <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
      <div className="h-6 bg-gray-200 rounded-lg w-5/6"></div>
      <div className="h-6 bg-gray-200 rounded-lg w-2/3"></div>
      <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
      <div className="h-6 bg-gray-200 rounded-lg w-2/3"></div>
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-300 rounded-lg w-full"></div>
    </div>
  );
};

export default SkeletonLoader;
