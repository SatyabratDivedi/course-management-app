import {useEffect, useState} from "react";
import {FaChevronCircleUp} from "react-icons/fa";
import {FaChevronCircleDown} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

const CourseDetails = () => {
  const navigate = useNavigate();
  const course = useSelector((state) => state.courses.selectedCourse);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [showImgSkeleton, setImgSkeleton] = useState(true);

  if (!course) {
    return <div className="p-4">Select a course to see the details</div>;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setImgSkeleton(false);
    }, 1500);
  }, []);

  return (
    <>
      <div className="p-4 px-10 flex flex-col sm:flex-row justify-between items-center  ">
        <div>
          <button onClick={() => navigate(-1)} className="bg-blue-300 px-2 rounded-md ">
            Back
          </button>
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            Name: {course?.name}
            <img width={28} src={course.courseThumbnail} alt="" />
          </h1>
          <p>
            <strong>Instructor:</strong> {course?.instructor}
          </p>
          <p>
            <strong>Description:</strong> {course?.description}
          </p>
          <p>
            <strong>Enrollment Status:</strong> {course?.enrollmentStatus}
          </p>
          <p>
            <strong>Course duration:</strong> {course?.duration}
          </p>
          <p>
            <strong>Schedule:</strong> {course?.schedule}
          </p>
          <p>
            <strong>Location:</strong> {course?.location}
          </p>
          <p>
            <strong>Pre-requisites:</strong> {course?.prerequisites}
          </p>
          <p>
            <strong>
              Syllabus:
              <button className="ml-1 translate-y-1" onClick={() => setShowSyllabus(!showSyllabus)}>
                {showSyllabus ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
              </button>
            </strong>
          </p>
          {showSyllabus && (
            <ul>
              {course?.syllabus?.map((item, index) => (
                <li className="md:ml-16 ml-3" key={index}>
                  <strong>Week {item.week}:</strong> Topic: {item.topic}
                </li>
              ))}
            </ul>
          )}
          <p>
            <strong>
              Student who enrolled this corse:
              <button className="ml-1 translate-y-1" onClick={() => setShowStudent(!showStudent)}>
                {showStudent ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
              </button>
            </strong>
          </p>
          {showStudent && (
            <ul>
              {course?.students?.map((item, index) => (
                <li className="md:ml-16 ml-3" key={index}>
                  <strong>{index + 1}:</strong> {item.name}
                </li>
              ))}
            </ul>
          )}
          <Link to={"/dashboard"} className="underline text-blue-400 hover:text-blue-600 cursor-pointer">
            👉 Go to The Students Dashboard
          </Link>
        </div>
        <div className="w-40 flex flex-col justify-between items-center h-[230px]">
          {showImgSkeleton ? <Skeleton width={180} height={200} /> : <img src={course?.instructorImg} alt="instructor-Image" />}
          <h2 className="text-2xl">{course?.instructor}</h2>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
