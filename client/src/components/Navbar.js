import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

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
      <div className="navbar-left">
        <img src="logo.png" alt="Logo" className="logo" />
      </div>

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
        <Link to="/about">O nama</Link>
        <Link to="/contact">Kontakt</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
