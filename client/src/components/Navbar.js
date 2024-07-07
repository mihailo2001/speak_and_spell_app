import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

const Navbar = () => {

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth',
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error)
          setAuthState({ ...authState, status: false });
        else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: response.data.role,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      username: "",
      id: 0,
      status: false,
      role: ""
    });
    navigate('/');
  };

  //Courses dropdown
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses');
        setCourses(response.data.listOfCourses);
      } catch (error) {
        console.log('Error fetching courses', error);
      }
    }
    fetchCourses();
  }, []);

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (

    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>

        <div className="logoDiv">
          <img id='logo' src="/images/logo.png" alt="Logo" className="logo" />
          <h1>SPEAK & SPELL</h1>
        </div>
      </Link>

      <div className="navbar-right">
        <Link to="/">Pocetna</Link>

        <div className="dropdown">
          <a className="dropbtn">Kursevi</a>
          <div className="dropdown-content">
            {courses.map((course) => (
              <a className="dropdown-item" key={course.id} onClick={() => handleCourseClick(course.id)}>
                {course.title}
              </a>
            ))}
          </div>
        </div>

        <Link to="/blog">Blog</Link>
        <Link to="/contact">Kontakt</Link>
        {authState.status ? (
          <>
            <Link to="/profile">My Profile</Link>
            <span onClick={logout} style={{ cursor: 'pointer' }}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
