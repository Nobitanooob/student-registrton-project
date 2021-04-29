import React, { useState }from 'react';
 import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';

 const Login = (props) => {
 
  const [response, setResponse] = useState({
    valid: "",
    message: "",
    id: "",
  });
   
   return (
     <Formik
       initialValues={{ email: '', password: '', type: 'student' }}
       validationSchema={Yup.object({
         email: Yup.string().email('Invalid email address').required('Required'),
         password: Yup.string()
           .min(1, 'Password Must be four characters long!')
           .max(20, 'Too Long!').required('Required'),
         type: Yup.string().required('Required')
       })}
           
       onSubmit={(values) => {
         const user = {
           email: values.email,
           password: values.password,
           type: values.type
         };
         axios.post('http://localhost:8000/', user)
           .then((respond) => {
             console.log(respond)
             setResponse({
               ...response,
               id: respond.data.id,
               valid: respond.data.valid,
               message: respond.data.message,
             });
             return respond;
           })
           .then((respond) => {
             if (respond.data.valid) {
               localStorage.setItem("userId", respond.data.id)
               props.handleUser(respond.data.id);
               props.handleIsStudent((user.type === 'student') ? true : false);
               props.handleIsLogin(respond.data.valid);
               return respond;
             }
           })
           .catch((err) => { console.log(err) });
         }}
       >
           
       <Form>
         <label htmlFor="email">Email Address</label>
         <Field name="email" type="email" />
         <ErrorMessage name="email" />
 
         <label htmlFor="password">Password </label>
         <Field name="password" type="password" autoComplete="Enter password"/>
         <ErrorMessage name="password" />
               
         <Field
          name="type">
          {({ field }) => (
            <>
              <div className="radio-item">
                <input
                  {...field}
                  id="student"
                  value="student"
                  defaultChecked
                  name="type"
                  type="radio"
                />
                <label htmlFor="student">Student</label>
              </div>

              <div className="radio-item">
                <input
                  {...field}
                  id="teacher"
                  value="teacher"
                  name="type"
                  type="radio"
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
            </>
          )}
        </Field>
         <button type="submit">Submit</button>
       </Form>
     </Formik>
   );
};
 
export default Login;