import React from 'react';
 import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';

 const Login = () => {
   return (
     <Formik
       initialValues={{email: '',password :'',type: 'student'}}
       validationSchema={Yup.object({
           email: Yup.string().email('Invalid email address').required('Required'),
           password: Yup.string()
                    .min(4, 'Password Must be four characters long!')
                    .max(20, 'Too Long!').required('Required'),
           type: Yup.string().required('Required')
       })}
           
           onSubmit={(values) => {
          //  axios.post('')
       }}
       >
           
       <Form>
         <label htmlFor="email">Email Address</label>
         <Field name="email" type="email" />
         <ErrorMessage name="email" />
 
         <label htmlFor="password">Password </label>
         <Field name="password" type="password" />
         <ErrorMessage name="password" />
               
         <Field
          name="type"
          render={({ field }) => (
            <>
              <div className="radio-item">
                <input
                  {...field}
                  id="student"
                  value="student"
                   checked={field.value === 'student'}
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
                  checked={field.value === 'teacher'}
                  type="radio"
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
            </>
          )}
        />
         <button type="submit">Submit</button>
       </Form>
     </Formik>
   );
};
 
export default Login;