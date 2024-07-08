import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TeachClassTime = () => {
  const { authState } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const weekdays = ['Ponedeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak', 'Subota'];

  useEffect(() => {
    axios.get('http://localhost:3001/courses')
      .then((response) => {
        setCourses(response.data.listOfCourses);
      })
      .catch((error) => {
        console.error('Error fetching the courses data!', error);
      });
  }, [authState.id]);

  if (authState.role !== 'teacher') {
    return <div>Nemate pravo pristupa</div>;
  }

  const initialValuesChangeCourse = {
    courseId: '',
    weekday: ''
  };

  const validationSchemaChangeCourse = Yup.object().shape({
    courseId: Yup.string().required('Izaberite kurs')
  });

  const handleChangeCourse = (values, { resetForm }) => {
    axios.put(`http://localhost:3001/courses/${values.courseId}`, {
      courseId: values.courseId,
      weekday: values.weekday,
      time: values.time
    })
      .then((response) => {
        alert('Termin je promijenjen!');
        resetForm();
      })
      .catch((error) => {
        console.error('Error on changing time!', error);
      });
  };

  return (
    <div>
      <div className='profile-content'>
        <div className='user-content'>
          <h1>Promijeni termine</h1>

          <div className='add-child-part'>
            <Formik initialValues={initialValuesChangeCourse} onSubmit={handleChangeCourse} validationSchema={validationSchemaChangeCourse}>
              <Form className='formContainerHorizontal'>
                <div>
                  <label className="label">Kurs:</label>
                  <ErrorMessage name="courseId" component="span" className="errorMessage" />
                  <Field as="select" className="inputField" name="courseId" required>
                    <option value="" disabled>Odaberi kurs</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  <label className="label">Dan:</label>
                  <Field as="select" className="inputField" name="weekday">
                    <option value="" disabled>Odaberi dan</option>
                    {weekdays.map((weekday) => (
                      <option key={weekday} value={weekday}>
                        {weekday}
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  <label className="label">Vrijeme:</label>
                  <Field type="time" className="inputField" name="time" />
                </div>

                <button type='submit' className='submitButton'>Promijeni</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeachClassTime
