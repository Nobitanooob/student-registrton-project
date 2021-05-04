import React, { useState } from 'react';
import {Grid,Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as Yup from 'yup';



 
  
 const AddNewUser = () => {
    
   const [buttonText, SetButtonText] = useState("Submit");
  const history = useHistory();
  const marginBottom = {
        marginBottom:20
 };
 const paperStyle={
    padding:20,
    height:'70vh',
    width:300,
    margin:'20px auto'
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle} >
              <Formik
              initialValues={{ name: '', email: '', department: '',type: 'student',confirm_password: '',password: ''}}
              validationSchema={Yup.object({
                name: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Required'),
                email: Yup.string().email('Invalid email address').required('Please Enter Email'),
                department: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Required'),
                password: Yup.string().min(1).max(20).required('please enter passsword'),
                confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Required'),
              })}

              onSubmit={(values) => {
                SetButtonText("Submitting ...");
                console.log(values);
                axios.post(`/create-student`, values)
                .then(res => {
                  console.log(res.data);
                  // to done later add redirect route
                  SetButtonText('Submitted!!');
                });
              }
              }
          >
            {(formik) => (
              <Form>

                <label htmlFor="name"></label>
                <Field as={TextField} style={marginBottom}  name="name" placeholder="name" fullWidth label="name" type="text " />
                <ErrorMessage name="name" />
            
                <label htmlFor="email"></label>
                <Field as={TextField} style={marginBottom} name="email" placeholder="Email" fullWidth label="Email" type="email" />
                <ErrorMessage name="email" />
            
                <label htmlFor="department"></label>
                <Field as={TextField} style={marginBottom}  name="department" placeholder="department" fullWidth label="department" type="text" />
                <ErrorMessage name="department" />
                
                <FormControl fullWidth variant="outlined" style={marginBottom}>
                  <InputLabel htmlFor="type">User Type</InputLabel>
                  <Select
                    native
                    label="type"
                    inputProps={{
                      name: 'type',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value= 'student' >Student</option>
                    <option value='teacher'>Teacher</option>
                  </Select>
                </FormControl>

                <Field as={TextField} style={marginBottom}  name="password" placeholder="Enter Password" fullWidth label="Password" type="text" />
                <ErrorMessage name="password" />

                <Field as={TextField} style={marginBottom}  name="confirm_password" placeholder="Enter Password Again" fullWidth label="Confirm Password" type="text" />
                <ErrorMessage name="confirm_password" />

                  <Button
                    type="submit"
                    style={marginBottom}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >{ buttonText }</Button>
              </Form>
            )}
            </Formik>
        </Paper>
      </Grid>
      </div>
  );
}

export default AddNewUser;