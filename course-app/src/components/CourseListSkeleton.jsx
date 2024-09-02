import Skeleton from "react-loading-skeleton";

const CourseListSkeleton = () => {
  return (
    <>
      <div className="border hover:scale-[1.01] duration-200 mb-5 bg-blue-100 p-4 rounded-lg shadow-lg flex flex-col-reverse sm:flex-row justify-between px-4 py-7 sm:px-10 lg:px-20">
        <div className="w-full">
          <Skeleton width="40%" height={30} />
          <Skeleton width="35%" height={10} />
          <Skeleton width="35%" height={10} />
          <Skeleton width="80%" />
          <Skeleton width="25%" height={30} borderRadius={10} />
        </div>
        <div className="w-[20%] translate-x-16 ">
          <Skeleton width={150} borderRadius={20} height={130} />
        </div>
      </div>
    </>
  );
};

export default CourseListSkeleton;
