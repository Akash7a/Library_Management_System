import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudents, clearSuccess, clearError } from '../features/Student/StudentSlice.js';

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const { pending, success, error, message } = useSelector((state) => state.auth);

  const [student, setStudent] = useState({
    name: '',
    address: '',
    mobile: '',
    entryDate: '',
    subscriptionEndDate: '',
    shift: '',
    reservedSeat: false,
    isSubscriptionActive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudents(student));

    setStudent({
      name: '',
      address: '',
      mobile: '',
      entryDate: '',
      subscriptionEndDate: '',
      shift: '',
      reservedSeat: false,
      isSubscriptionActive: false,
    });

    setTimeout(() => {
      dispatch(clearSuccess());
      dispatch(clearError());
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Add New Student</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={student.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={student.mobile}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="entryDate">Entry Date</label>
          <input
            type="date"
            id="entryDate"
            name="entryDate"
            value={student.entryDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="subscriptionEndDate">Subscription End Date</label>
          <input
            type="date"
            id="subscriptionEndDate"
            name="subscriptionEndDate"
            value={student.subscriptionEndDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="shift">Shift</label>
          <select
            id="shift"
            name="shift"
            value={student.shift}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Shift</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            <input
              type="checkbox"
              name="reservedSeat"
              checked={student.reservedSeat}
              onChange={handleChange}
              className="mr-2"
            />
            Reserved Seat
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            <input
              type="checkbox"
              name="isSubscriptionActive"
              checked={student.isSubscriptionActive}
              onChange={handleChange}
              className="mr-2"
            />
            Subscription Active
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          disabled={pending}
        >
          {pending ? "Adding..." : "Add Student"}
        </button>

        {success && <p className="mt-4 text-green-600">{message || "Student added successfully!"}</p>}
        {error && <p className="mt-4 text-red-600">{message || "An error occurred"}</p>}
      </form>
    </div>
  );
};

export default AddStudentForm;