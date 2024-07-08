import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [childrenEnrollments, setChildrenEnrollments] = useState({});

  useEffect(() => {
    if (authState.role === 'teacher') {

      axios.get(`http://localhost:3001/courses/teacher-data/${authState.id}`)
        .then((response) => {
          setCoursesData(response.data.courses);
        })
        .catch((error) => {
          console.error('There was an error fetching the teacher data!', error);
        });

    } else if (authState.role === 'parent') {
      
      axios.get(`http://localhost:3001/child/byParent/${authState.id}`)
        .then((response) => {
          const childrenData = response.data.children;
          setChildren(childrenData);

          childrenData.forEach(child => {
            axios.get(`http://localhost:3001/enrollments/byChild/${child.id}`)
              .then((enrollmentResponse) => {
                console.log(`Enrollments for child ${child.id}:`, enrollmentResponse.data);
                setChildrenEnrollments(prevState => ({
                  ...prevState,
                  [child.id]: enrollmentResponse.data
                }));
              })

              .catch((error) => {
                console.error(`There was an error fetching the enrollments data for child ${child.id}!`, error);
              });
          });
        })

        .catch((error) => {
          console.error('There was an error fetching the children data!', error);
        });
    }

  }, [authState.id, authState.role]);

  const renderEnrollments = (childId) => {
    const enrollments = childrenEnrollments[childId] || [];
    return enrollments.map(enrollment => (
      <div key={enrollment.id}>
        <br/>
        <p>kurs: {enrollment.Course.title}</p>
        <p>status: {enrollment.status}</p>
        <p>dan: {enrollment.Course.weekday}, termin: {enrollment.Course.time}</p>

      </div>
    ));
  };

  const renderData = () => {
    if (authState.role === 'teacher') {
      return (
        <div>
          <h2>moji kursevi</h2>
          <ul className='listaDjece'>
            {coursesData && coursesData.map((course) => (
               <div className='djete'>
              <li key={course.id}>{course.title} - {course.weekday} u {course.time}</li>
              </div>
            ))}
          </ul>
          <br/>
        </div>
      );

    } else if (authState.role === 'parent') {
      return (
        <div>
          <h2>moja djeca</h2>
          <ul className='listaDjece'>
            {children && children.map((child) => (
              <div className='djete'>
              <li key={child.id}>
                <h4>{child.name}:</h4>
                {renderEnrollments(child.id)}
              </li>
              </div>
            ))}
          </ul>
          <br/>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="profile-page">
      <div className='user-content'>
      <h1>Lični podaci</h1>
      <div>
        <p>korisničko ime: {authState.username}</p>
        <p>status: {authState.role}</p>
      </div>
      {renderData()}
    </div>
    </div>
  );
};

export default Profile;
