import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Course from './pages/Course';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';


import Profile from './pages/Profile';
import LayoutWithSidebar from './components/LayoutWithSidebar';

import AdmCourses from './pages/AdminPages/AdmCourses';
import AdmAddCourse from './pages/AdminPages/AdmAddCourse';
import AdmPayments from './pages/AdminPages/AdmPayments';
import AdmTeachers from './pages/AdminPages/AdmTeachers';
import ParentAddChild from './pages/ParentPages/ParentAddChild';
import ParentPayments from './pages/ParentPages/ParentPayments';
import TeachClassTime from './pages/TeacherPages/TeachClassTime';
import TeachPosts from './pages/TeacherPages/TeachPosts';
import TeachRemChild from './pages/TeacherPages/TeachRemChild';
import TeachRequests from './pages/TeacherPages/TeachRequests';

import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    role: ""
  });

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: response.data.role
          });
        }
        console.log(authState.username);
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Homepage />}></Route>
            <Route path="/course/:id" element={<Course />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/profile" element={<LayoutWithSidebar> <Profile /> </LayoutWithSidebar>} />

            <Route path="/admin/courses" element={<LayoutWithSidebar> <AdmCourses /> </LayoutWithSidebar>} />
            <Route path="/admin/payments" element={<LayoutWithSidebar> <AdmPayments /> </LayoutWithSidebar>} />
            <Route path="/admin/teachers" element={<LayoutWithSidebar> <AdmTeachers /> </LayoutWithSidebar>} />
            <Route path="/admin/new-course" element={<LayoutWithSidebar> <AdmAddCourse /> </LayoutWithSidebar>} />

            <Route path="/teacher/posts" element={<LayoutWithSidebar> <TeachPosts /> </LayoutWithSidebar>} />
            <Route path="/teacher/class-time" element={<LayoutWithSidebar> <TeachClassTime /> </LayoutWithSidebar>} />
            <Route path="/teacher/remove-child" element={<LayoutWithSidebar> <TeachRemChild /> </LayoutWithSidebar>} />
            <Route path="/teacher/enrollments" element={<LayoutWithSidebar> <TeachRequests /> </LayoutWithSidebar>} />
          
            <Route path="/parent/add-child" element={<LayoutWithSidebar> <ParentAddChild /> </LayoutWithSidebar>} />
            <Route path="/parent/payments" element={<LayoutWithSidebar> <ParentPayments /> </LayoutWithSidebar>} />          

              <Route path="*" exact element={<PageNotFound/>}/>
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
