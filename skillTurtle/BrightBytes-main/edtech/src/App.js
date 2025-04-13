import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import About from './components/Home/About/About.jsx';
import ForgetPassword from './components/Home/Auth/ForgetPassword.jsx';
import Login from './components/Home/Auth/Login.jsx';
import Register from './components/Home/Auth/Register.jsx';
import ResetPassword from './components/Home/Auth/ResetPassword.jsx';
import Contact from './components/Home/Contact/Contact.jsx';
import CoursePage from './components/Home/CoursePage/CoursePage.jsx';
import Courses from './components/Home/Courses/Courses.jsx';
import Home from './components/Home/Home.jsx';
import Footer from './components/Home/Layout/Footer/Footer.jsx';
import Header from './components/Home/Layout/Header/Header.jsx';
import NotFound from './components/Home/Layout/NotFound/NotFound.jsx';
import PaymentFail from './components/Home/Payments/PaymentFail.jsx';

import PaymentSucces from './components/Home/Payments/PaymentSucces.jsx';
import Subscribe from './components/Home/Payments/Subscribe.jsx';
import ChangePassword from './components/Home/Profile/ChangePassword.jsx';
import Profile from './components/Home/Profile/Profile.jsx';
import Request from './components/Home/Request/Request.jsx';
import UpdateProfile from './components/Home/Profile/UpdateProfile.jsx';
import Dashboard from './components/Home/Admin/Dashboard/Dashboard.jsx';
import CreateCourse from './components/Home/Admin/CreateCourse/CreateCourse'
import AdminCourses from './components/Home/Admin/AdminCourses/AdminCourses'
import Users from './components/Home/Admin/Users/Users'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'
import { loadUser } from './redux/actions/user.js';
import { ProtectedRoute } from "protected-route-react";
import Loader from './components/Home/Layout/Loader/Loader.jsx';

//
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  })

  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user)

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" })
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" })
    }
  }, [dispatch, error, message]);


  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  return (
    <Router>
      {
        loading ? (
          <Loader />) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/profile" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
              />


              <Route path="/changepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword /></ProtectedRoute>} />
              <Route path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile user={user} /></ProtectedRoute>} />
              <Route path="/course/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CoursePage user={user} /></ProtectedRoute>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request" element={<Request />} />
              <Route path="/about" element={<About />} />



              <Route path="/login" element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                  <Login />
                </ProtectedRoute>
              } />



              <Route path="/register" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <Register /></ProtectedRoute>} />
              <Route path="/forgetpassword" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"><ForgetPassword /></ProtectedRoute>} />
              <Route
                path="/resetpassword/:token"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <ResetPassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe user={user} /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />

              <Route path="/paymentsuccess" element={<PaymentSucces />} />
              <Route path="/paymentfail" element={<PaymentFail />} />



              {/* Admin Routes */}

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAuthenticated={isAuthenticated}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/createcourse"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAuthenticated={isAuthenticated}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />


              <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAuthenticated={isAuthenticated}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <AdminCourses />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAuthenticated={isAuthenticated}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />


            </Routes>
            <Footer />
            <Toaster />
          </>
        )
      }
    </Router>
  );
}

export default App;
