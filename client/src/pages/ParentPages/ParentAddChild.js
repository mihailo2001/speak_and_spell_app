import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ParentAddChild = () => {
  const { authState } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/child/byParent/${authState.id}`)
      .then((response) => {
        setChildren(response.data.children);
      })
      .catch((error) => {
        console.error('Error fetching the children data!', error);
      });

    axios.get('http://localhost:3001/courses')
      .then((response) => {
        setCourses(response.data.listOfCourses);
      })
      .catch((error) => {
        console.error('Error fetching the courses data!', error);
      });
  }, [authState.id]);

  if (authState.role !== 'parent') {
    return <div>Nemate pravo pristupa</div>;
  }

  const initialValuesAddChild = {
    name: '',
    birthdate: ''
  };

  const initialValuesAddEnrollment = {
    childId: '',
    courseId: ''
  };

  const validationSchemaAddChild = Yup.object().shape({
    name: Yup.string().required('Ime je obavezno'),
    birthdate: Yup.date().required('Datum rodjenja je obavezan')
  });

  const validationSchemaAddEnrollment = Yup.object().shape({
    childId: Yup.string().required('Izaberite dijete'),
    courseId: Yup.string().required('Izaberite kurs')
  });

  const handleAddChild = (values, { resetForm }) => {
    axios.post('http://localhost:3001/child', {
      name: values.name,
      birthdate: values.birthdate,
      userId: authState.id
    })
      .then((response) => {
        alert('Vase dijete je dodato!');
        setChildren([...children, { id: response.data.id, name: values.name, birthdate: values.birthdate, userId: authState.id }]);
        resetForm();
      })
      .catch((error) => {
        console.error('Error while adding the child!', error);
      });
  };

  const handleAddEnrollment = (values, { resetForm }) => {
    axios.post('http://localhost:3001/enrollments', {
      childId: values.childId,
      courseId: values.courseId
    })
      .then((response) => {
        alert('Vase dijete je upisano na kurs!');
        resetForm();
      })
      .catch((error) => {
        console.error('Error on adding the enrollment!', error);
      });
  };

  return (
    <div className='profile-content'>
      <div className='user-content'>
        <h1>Prijavi dijete</h1>

        <div className='add-child-part'>
          <h2>Dodaj novo dijete</h2>
          <Formik initialValues={initialValuesAddChild} onSubmit={handleAddChild} validationSchema={validationSchemaAddChild}>
            <Form className='formContainer'>

              <label className="label">Ime:</label>
              <ErrorMessage name="name" component="span" className="errorMessage" />
              <Field className="inputField" name="name" placeholder="Ime..." />

              <label className="label">Datum rodjenja:</label>
              <ErrorMessage name="birthdate" component="span" className="errorMessage" />
              <Field type="date" className="inputField" name="birthdate" />

              <button type='submit' className='submitButton'>Dodaj dijete</button>
            </Form>
          </Formik>
        </div>
        
        <hr />
        <div className='add-child-part'>
          <h2>Upisi dijete na kurs</h2>
          <Formik initialValues={initialValuesAddEnrollment} onSubmit={handleAddEnrollment} validationSchema={validationSchemaAddEnrollment}>
            <Form className='formContainerHorizontal'>
              <div>
                <label className="label">Dijete:</label>
                <ErrorMessage name="childId" component="span" className="errorMessage" />
                <Field as="select" className="inputField" name="childId" required>
                  <option value="" disabled>Odaberi dijete</option>
                  {children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </Field>
              </div>

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

              <button type='submit' className='submitButton'>Upisi dijete</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ParentAddChild;
