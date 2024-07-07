import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
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

        <footer className="footer">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="logoDiv">
                    <img id='logo' src="/images/logo.png" alt="Logo" className="logo" />
                    <h1>SPEAK & SPELL</h1>
                </div>
            </Link>

            <div className="footerLinks">
                <h3>Linkovi</h3>
                <ul>
                    <li><Link to="/">Pocetna</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
                </ul>
            </div>

            <div className='footerCourses'>
                <h3>Kursevi</h3>
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            <Link to={`/course/${course.id}`}>{course.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
