import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AdmCourses = () => {
  const { authState } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/courses`);
        setCourses(response.data.listOfCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth`);
        setTeachers(response.data.listOfUsers.filter(user => user.role === 'teacher'));
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchCourses();
    fetchTeachers();
  }, [authState.id]);

  if (authState.role !== 'admin') {
    return <p>Nemate pravo pristupa</p>;
  }

  const handleRemove = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3001/courses/${courseId}`);
      const response = await axios.get(`http://localhost:3001/courses`);
      setCourses(response.data.listOfCourses);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const initialValuesChangeTeacher = {
    courseId: '',
    teacherId: ''
  };

  const validationSchemaChangeTeacher = Yup.object().shape({
    courseId: Yup.string().required('Izaberi kurs'),
    teacherId: Yup.string().required('Izaberi nastavnika')
  });

  const handleChangeTeacher = (values, { resetForm }) => {
    axios.put(`http://localhost:3001/courses/${values.courseId}`, {
      userId: values.teacherId,
    })
      .then((response) => {
        alert('Nastavnik je promijenjen!');
        resetForm();
        // Fetch updated courses list
        axios.get(`http://localhost:3001/courses`)
          .then((response) => {
            setCourses(response.data.listOfCourses);
          })
          .catch((error) => {
            console.error('Error fetching updated courses:', error);
          });
      })
      .catch((error) => {
        console.error('Error on changing teacher!', error);
      });
  };

  return (
    <div>

      <div className='profile-content'>
        <div className='user-content'>
          <h1>Promijeni predavaca</h1>

          <div className='add-child-part'>
            <Formik initialValues={initialValuesChangeTeacher} onSubmit={handleChangeTeacher} validationSchema={validationSchemaChangeTeacher}>
              <Form className='formContainerHorizontal'>
                <div>
                  <label className="label">Kurs:</label>
                  <ErrorMessage name="courseId" component="span" className="errorMessage" />
                  <Field as="select" className="inputField" name="courseId">
                    <option value="" disabled>Odaberi kurs</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  <label className="label">Nastavnik:</label>
                  <ErrorMessage name="teacherId" component="span" className="errorMessage" />
                  <Field as="select" className="inputField" name="teacherId">
                    <option value="" disabled>Odaberi nastavnika</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.username}
                      </option>
                    ))}
                  </Field>
                </div>

                <button type='submit' className='submitButton'>Promijeni</button>
              </Form>
            </Formik>
          </div>
        </div>

      <hr />

        <div className='user-content'>
          <h1>Ukloni kurs</h1>
          <table>
            <thead>
              <tr>
                <th>Kurs</th>
                <th>Nastavnik</th>
                <th>Ukloni</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.User?.username}</td>
                  <td>
                    <button onClick={() => handleRemove(course.id)}>Ukloni</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdmCourses;
