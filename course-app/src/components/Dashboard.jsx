import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch("http://localhost:3000/api/all-course");
      const data = await res.json();
      setCourses(data);
      setShowSkeleton(false);
    };
    fetchCourse();
    window.scrollTo(0, 0);
  }, []);

  const checkClkHandler = async (isCompleted, studentId, courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course._id !== courseId) return course;
        return {
          ...course,
          students: course.students.map((student) => (student._id === studentId ? {...student, isCompleted: !isCompleted} : student)),
        };
      })
    );
    const res = await fetch("http://localhost:3000/api/course-done-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted,
        studentId,
        courseId,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-5 flex-col sm:flex-row">
        <button onClick={() => navigate("/")} className="bg-blue-300 px-2 rounded-md m-2 max-w-20">
          Home
        </button>
        <button className="bg-green-300 px-2 rounded-md m-2 sm:w-[50%] ">
          You can update the course that student completed or not instantly
        </button>
      </div>
      <div className="space-y-4">
        {showSkeleton
          ? [1, 2, 3,4].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-9 bg-blue-100 items-center p-4 border rounded shadow-sm">
                <div>
                  <Skeleton width={60} height={60} borderRadius={10} />
                </div>
                <div className="ml-5 w-full">
                  <Skeleton width="50%" />
                  <Skeleton width="30%" height={10} />
                  <Skeleton width="20%" height={10} />
                  <Skeleton width="100%" height={12} />
                </div>
                <div className="ml-5 w-[25%]">
                  <Skeleton width="100%" />
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            ))
          : courses.map((course) => (
              <div key={course.name} className="flex flex-col sm:flex-row gap-9 bg-blue-100 items-center p-4 border rounded shadow-sm">
                <img src={course.courseThumbnail} alt={course.name} className="w-16 h-16 rounded mr-4" />
                <div className="flex-grow">
                  <h2 className="text-xl font-bold">{course.name}</h2>
                  <p className="text-sm">Instructor: {course.instructor}</p>
                  <p className="text-sm">Duration: {course.duration}</p>
                </div>
                <p>
                  <div className="flex items-center gap-1 flex-col">
                    Student who enrolled this course👇🏻
                    <ul>
                      {course?.students?.map((item, index) => (
                        <li key={index} className="flex gap-2 items-center">
                          <span> {index +1}. {item.name}</span>
                          <span>{item.isCompleted}</span>
                          <input className="cursor-pointer" onClick={() => checkClkHandler(item.isCompleted, item._id, course._id)} type="checkbox" checked={item.isCompleted} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
