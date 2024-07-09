import React, { useContext } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TeachPosts = () => {
  const { authState } = useContext(AuthContext);

  if (authState.role !== 'teacher') {
    return <div>Nemate pravo pristupa</div>;
  }

  const initialValuesAddPost = {
    title: '',
    content: '',
    images: []
  };

  const validationSchemaAddPost = Yup.object().shape({
    title: Yup.string().required('Naslov je obavezan'),
    content: Yup.string().required('Sadrzaj je obavezan'),
    images: Yup.array().min(1, 'Potrebna je makar jedna slika')
  });

  const handleAddPost = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:3001/posts', {
        title: values.title,
        content: values.content,
        userId: authState.id
      });

      const postId = response.data.id;
      console.log(postId);

      const formData = new FormData();
      values.images.forEach(image => {
        formData.append('files', image);
      });

      await axios.post(`http://localhost:3001/files/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      resetForm();
    } catch (error) {
      console.log('Error while sending images', error);
    }
  };

  return (
    <div className='profile-content'>
      <div className='user-content'>
        <h1>Napisi novi blog</h1>

        <div className='add-child-part'>
          <h2>Blog:</h2>
          <Formik
            initialValues={initialValuesAddPost}
            onSubmit={handleAddPost}
            validationSchema={validationSchemaAddPost}
          >
            {({ setFieldValue }) => (
              <Form className='formContainer new-blog'>

                <label className="label">Naslov:</label>
                <ErrorMessage name="title" component="span" className="errorMessage" />
                <Field className="inputField" name="title" placeholder="Naslov..." />

                <label className="label">Sadrzaj:</label>
                <ErrorMessage name="content" component="span" className="errorMessage" />
                <Field as="textarea" className="inputField new-blog-content" name="content" placeholder="Sadrzaj" rows={6} />
                
                <label className="label">Slike:</label>
                <ErrorMessage name="images" component="span" className="errorMessage" />
                <input
                  type="file"
                  className="inputField"
                  name="images"
                  multiple
                  onChange={(event) => {
                    setFieldValue("images", Array.from(event.currentTarget.files));
                  }}
                />
                
                <button type='submit' className='submitButton'>Objavi</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TeachPosts;