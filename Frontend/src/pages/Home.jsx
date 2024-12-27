import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getStudents, deleteStudent } from "../features/Student/StudentSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students, pending, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (!students) {
      dispatch(getStudents());
    }
  }, [students, dispatch]);

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();

    end.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDiff = end - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const handleDelete = (studentId) => {
    dispatch(deleteStudent(studentId));
  };

  const handleUpdate = (studentId) => {
    navigate("/updateStudent", { state: { studentId } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 relative">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">Student Details</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Name</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Address</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Mobile</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Days</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Shift</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Reserved</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Subscription</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Remove</th>
                <th className="py-4 px-8 text-left text-lg font-semibold border border-gray-200">Update</th>
              </tr>
            </thead>
            <tbody>
              {pending ? (
                <tr>
                  <td colSpan="9" className="py-6 px-6 text-center text-lg text-gray-800">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="9" className="py-6 px-6 text-center text-lg text-red-600">{error}</td>
                </tr>
              ) : students && students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}`}
                  >
                    <td className="py-4 px-8 text-lg text-gray-800 border border-gray-200">{student.name}</td>
                    <td className="py-4 px-8 text-lg text-gray-800 border border-gray-200">{student.address}</td>
                    <td className="py-4 px-8 text-lg text-gray-800 border border-gray-200">{student.mobile}</td>
                    <td className="py-4 px-8 text-lg text-gray-800 border border-gray-200">{calculateDaysRemaining(student.subscriptionEndDate)} days</td>
                    <td className="py-4 px-8 text-lg text-gray-800 border border-gray-200">{student.shift}</td>
                    <td className={`py-4 px-8 text-lg text-gray-800 border border-gray-200 ${student.reservedSeat ? "text-lime-600 font-bold bg-gray-300" : ""}`}>{student.reservedSeat ? 'Yes' : 'No'}</td>
                    <td className={`py-4 px-8 text-lg border border-gray-200 ${student.isSubscriptionActive ? 'bg-green-400' : 'bg-red-400'}`}>
                      {student.isSubscriptionActive ? 'Active' : 'Inactive'}
                    </td>
                    <td className="py-4 px-8 text-lg text-gray-800 border border-gray-200">
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="py-4 px-8 text-lg text-gray-800 border border-gray-200">
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        onClick={() => handleUpdate(student._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-6 px-6 text-center text-lg text-gray-800">No students available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;