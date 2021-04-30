import React, { useState }from 'react';
import { Avatar, Grid,Paper,Button, TextField,FormControlLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
 import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';

 const Login = (props) => {
 
  const [response, setResponse] = useState({
    valid: "",
    message: "",
    id: "",
  });
  const paperStyle={
      padding:20,
      height:'70vh',
      width:300,
      margin:'20px auto'
  };
  const avatarStyle={
      backgroundColor:'#1bbd7e'
  };
  const marginBottom={
      marginBottom:20
  };
  const checkBoxStyle={
    margin:20,
    fontSize:'1.5rem'
  }
   
   return (
    <Grid>
      <Paper elevation={10} style={paperStyle} >
          <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
              <h2>Sign In</h2>
          </Grid>
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
                  <label htmlFor="email"></label>
                  <Field as={TextField} style={marginBottom} name="email" placeholder="Email"  fullWidth label="Email"  type="email" />
                  <ErrorMessage name="email" />
          
                  <label htmlFor="password"> </label>
                  <Field as={TextField} name="password" style={marginBottom} fullWidth placeholder="Password"  type="password" label="password" autoComplete="Enter password"/>
                  <ErrorMessage name="password" />
                      
                  <Field
                  as={FormControlLabel}
                  name="type">
                  {({ field }) => (
                      <>
                      <div className="radio-item" style={checkBoxStyle}>
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

                      <div className="radio-item" style={checkBoxStyle}>
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
                  <Button type="submit" style={marginBottom} color="primary" variant="contained"  fullWidth>Submit</Button>
              </Form>
              </Formik>          
      </Paper>
</Grid>
);
}
export default Login;