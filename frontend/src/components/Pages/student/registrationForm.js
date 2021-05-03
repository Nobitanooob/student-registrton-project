import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const marginBottom = {
  marginBottom:20
};
 
  
function RegistrationForm() {

  const [file, setFile] = useState(null);
  const [buttonText,SetButtonText] = useState("Submit")
  const history = useHistory();

  return (
    <div>
    <Formik
        initialValues={{ name: '', email: '', department: '', semester: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
        })}

        onSubmit={(values) => {
          SetButtonText("Submitting ...")
          let formData = new FormData();
         
          formData.append("myfile", file[0]);
          formData.append("data", values.name);
          console.log(formData.get('data'));
          axios.post(`http://localhost:8000/student/form/${localStorage.userId}`, formData,
          {headers: {
            'Content-Type': 'multipart/form-data',
          }}
          ).then(res => {
            console.log(res.data)
          });
        }
        }
    >
      {(formik) => (
        <Form>

          <label htmlFor="name"></label>
          <Field  name="name" placeholder="name" fullWidth label="name" type="text " />
          <ErrorMessage name="name" />
       
          <label htmlFor="email"></label>
          <Field  name="email" placeholder="Email" fullWidth label="Email" type="email" />
          <ErrorMessage name="email" />
       
          <label htmlFor="department"></label>
          <Field  name="department" placeholder="department" fullWidth label="department" type="text" />
          <ErrorMessage name="department" />
       
          <label htmlFor="semester">Semester </label>
          <Field name="semester" as="select" type="select">
            <option value="" >Select Semester</option>
            <option value="1" >1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </Field>
     
          <input className="form-group" name="file" type='file' onChange={
            (event) => setFile(event.target.files)     } />

            <button
              type="submit"
              style={marginBottom}
              color="primary"
              variant="contained"
              fullWidth
            >{ buttonText }</button>
        </Form>
      )}
      </Formik>
      </div>
  );
}


export default RegistrationForm;