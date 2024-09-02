import { Link } from "react-router-dom";

const CourseItem = ({ course, onClick, index }) => {
  return (
    <div className='border hover:scale-[1.01] duration-200 bg-blue-100 p-4 rounded-lg shadow-lg flex flex-col-reverse
    sm:flex-row justify-between px-4 sm:px-10 lg:px-20'>
      <div onClick={onClick}>
    <Link to={`/course/${course.name}`} className='text-xl font-semibold'> {index+1}. {course.name}</Link>
        <p className='text-gray-600'><span className="font-medium">Instructor:</span> {course.instructor}</p>
        <p className='text-gray-500'>{course.description}</p>
        <p className='text-gray-500 mb-2'><span className="font-medium">Duration:</span> {course.duration}</p>
        <Link to={`/course/${course.name}`} className='bg-blue-400 cursor-pointer px-3 py-1 rounded-lg hover:text-gray-200'>
          Course Details
        </Link>
      </div>
      <div className="w-full flex justify-center sm:justify-end ">
        <img className='w-40' src={course.courseThumbnail} alt='course-Image' />
      </div>
    </div>
  );
};

export default CourseItem;
