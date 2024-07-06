import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {

    const initialValues = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters long')
            .max(15, 'Username must be at most 15 characters long')
            .required('Username is required'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters long')
            .max(20, 'Password must be at most 20 characters long')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/register", data)
            .then((response) => {
                console.log(response.data);
                navigate('/login');
            })
            .catch((error) => {
                console.error("There was an error registering the user!", error);
            });
    };

    return (
        <div className='registrationPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

                <Form className='formContainer'>
                    <label className="label">Username: </label>
                    <ErrorMessage name="username" component="span" className="errorMessage" />
                    <Field
                        className="inputField"
                        name="username"
                        placeholder="(Ex. John123...)"
                    />

                    <label className="label">Password: </label>
                    <ErrorMessage name="password" component="span" className="errorMessage" />
                    <Field
                        type="password"
                        className="inputField"
                        name="password"
                        placeholder="Your Password..."
                    />

                    <label className="label">Confirm Password: </label>
                    <ErrorMessage name="confirmPassword" component="span" className="errorMessage" />
                    <Field
                        type="password"
                        className="inputField"
                        name="confirmPassword"
                        placeholder="Confirm Your Password..."
                    />

                    <button type='submit' className='submitButton'> Register </button>
                    <p>or <Link className='smallLink' to="/login">Login</Link></p>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
