import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

const Course = () => {
  let { id } = useParams();
  const [course, setCourse] = useState({});
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
      });
  }, [id]);

  const toLogin = (() => {
    navigate('/login');
  });

  const toRegister = (() => {
    navigate('/register');
  })

  return (
    <div>
      <div className='coursePage'>
        <div className='courseContent'>
          <h1> {course.title} </h1>
          <div className='postBody'> {course.description} </div>
          <div className='autor'>
            predavač: {course.User?.username}
          </div>
          <div className='autor'>
            termin: {course.weekday}, {course.time}
          </div>
          <div className='autor'>
            cijena: {course.cost}
          </div>
        </div>
        {!authState.status &&
          <div className='courseContent'>
            Prijavite svoje dijete:
            <button className='button' onClick={toLogin}>Login</button>
            ili
            <button className='button' onClick={toRegister}>Register</button>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Course
