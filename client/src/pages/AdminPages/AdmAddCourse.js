import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AdmAddCourse = () => {
    const { authState } = useContext(AuthContext);
    const weekdays = ['Ponedeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak', 'Subota'];
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth');
                setTeachers(response.data.listOfUsers.filter(user => user.role === 'teacher'));
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, [authState.id]);

    if (authState.role !== 'admin') {
        return <div>Nemate pravo pristupa</div>;
    }

    const initialValuesAddCourse = {
        title: '',
        description: '',
        teacherId: '',
        weekday: '',
        time: '',
        cost: '',
    };

    const validationSchemaAddCourse = Yup.object().shape({
        title: Yup.string().required('Naslov je obavezan'),
        description: Yup.string().required('Opis je obavezan'),
        teacherId: Yup.string().required('Nastavnik je obavezan'),
        weekday: Yup.string().required('Dan je obavezan'),
        time: Yup.string().required('Vrijeme je obavezno'),
        cost: Yup.string().required('Cijena je obavezna'),
    });

    const handleAddCourse = async (values, { resetForm }) => {
        try {
            await axios.post('http://localhost:3001/courses', {
                title: values.title,
                description: values.description,
                teacherId: values.teacherId,
                weekday: values.weekday,
                time: values.time,
                cost: values.cost,
            });

            resetForm();
        } catch (error) {
            console.error('Error while adding course:', error);
        }
    };

    return (
        <div className='profile-content'>
            <div className='user-content'>
                <h1>Dodaj kurs</h1>

                <div className='add-child-part column'>
                    <Formik
                        initialValues={initialValuesAddCourse}
                        onSubmit={handleAddCourse}
                        validationSchema={validationSchemaAddCourse}
                    >
                        <Form className='formContainer new-blog'>
                            <label className="label">Naslov:</label>
                            <ErrorMessage name="title" component="span" className="errorMessage" />
                            <Field className="inputField" name="title" placeholder="Naslov..." />

                            <label className="label">Opis:</label>
                            <ErrorMessage name="description" component="span" className="errorMessage" />
                            <Field as="textarea" className="inputField new-blog-content" name="description" placeholder="Opis..." rows={6} />

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

                            <div>
                                <label className="label">Dan:</label>
                                <ErrorMessage name="weekday" component="span" className="errorMessage" />
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
                                <ErrorMessage name="time" component="span" className="errorMessage" />
                                <Field type="time" className="inputField specForTime" name="time" />
                            </div>

                            <label className="label">Cijena:</label>
                            <ErrorMessage name="cost" component="span" className="errorMessage" />
                            <Field className="inputField" name="cost" placeholder="Cijena..." />

                            <button type='submit' className='submitButton'>Objavi</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AdmAddCourse;
