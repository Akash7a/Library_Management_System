import React, { useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdminFromToken } from './features/Auth/AuthSlice';
import AddStudentForm from './components/AddStudentForm';
import Navbar from './components/Navbar';
import UpdateStudentForm from './components/UpdateStudent';

const App = () => {
  const dispatch = useDispatch();
  const { token, pending, admin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadAdminFromToken());
  }, [dispatch]);

  if (pending) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/addNewStudent" element={<AddStudentForm />} />
          <Route path='/updateStudent' element={<UpdateStudentForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;