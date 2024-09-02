import {useEffect, useMemo, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCourses, selectCourse, enrollCourse} from "../redux/courseSlice";
import CourseItem from "./CourseItem";
import {useLocation} from "react-router-dom";
import CourseListSkeleton from "./CourseListSkeleton";

const CourseList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const [searchInput, setSearchInput] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch("https://course-management-app-backend.vercel.app/api/all-course");
      const data = await res.json();
      dispatch(setCourses(data));
      dispatch(enrollCourse(data));
      setShowSkeleton(false);
    };
    fetchCourse();
  }, [dispatch, location.pathname]);

  const handleCourseClick = (course) => {
    dispatch(selectCourse(course));
  };

  const changeHandle = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const filterCourses = useMemo(() => {
    if (searchInput === "") {
      return courses;
    } else {
      const searchItem = courses.filter((item) => item.name.toLowerCase().includes(searchInput) || item.instructor.toLowerCase().includes(searchInput));
      return searchItem;
    }
  }, [courses, searchInput]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex flex-col sm:flex-row  justify-between">
        Courses
        <input type="text" onChange={(e) => changeHandle(e)} className="bg-blue-100 px-6 py-2 rounded-md outline-none font-normal text-[1.2rem]" placeholder="Course, instructor name" name="" id="" />
      </h1>

      {showSkeleton ? (
        [1,2,3,4,5].map((_, i)=>(<CourseListSkeleton key={i} />))
      ) : (
        <div className="space-y-4">
          {filterCourses?.map((course, index) => (
            <CourseItem key={course.name} index={index} course={course} onClick={() => handleCourseClick(course)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
