import React, { useEffect, useState } from 'react';
import {Grid,Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControl from '@material-ui/core/FormControl';
import { Select , MenuItem} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as Yup from 'yup';
import firebase from 'firebase';


 
  
function RegistrationForm() {
  const [user, setUser] = useState();
  const [uploadedFile, setFile] = useState(null);
  const [fileUrl, setUrl] = useState();
  const [semester, setSemester] = React.useState('');
  const [buttonText,SetButtonText] = useState("Submit")
  const history = useHistory();

  useEffect(() => {
    axios.get(`/user/${localStorage.userId}`)
      .then((data) => {
        // console.log('data', data.data.user);
        setUser(data.data.user);
      });
   }, []);

  const handleFile = async (e) => {
    try {
      let file = uploadedFile[0];
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      setUrl(fileUrl);
    } catch (error) {
      console.log(`error!!`, error);
    }
    
  }


  const marginBottom = {
        marginBottom:20
 };
 const paperStyle={
    padding:20,
    height:'70vh',
    width:300,
    margin:'20px auto'
  };
  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle} >
              <Formik
            initialValues={{
              name: '', email: '', department: ''
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              department: Yup.string(),
            })}

            // onSubmit={(values) => {
            //   SetButtonText("Submitting ...")
            //   let formData = new FormData();
            //   // console.log('values', values);
            //   formData.append("file", file[0]);
            //   formData.append("name", values.name);
            //   formData.append("email", values.email);
            //   formData.append("department", values.department);
            //   formData.append("semester", semester);

            //   // console.log('formData.get())',formData.get('semester'));
            //   axios.post(`http://localhost:8000/student/form/${localStorage.userId}`, formData,
            //     {
            //       headers: {
            //     'Content-Type': 'multipart/form-data',
            //   }}
            //   ).then(res => {
            //     console.log(res.data);
            //     if (res)
            //     {
            //       SetButtonText('submitted!!');
            //     }
            //     history.go('/status');
            //   });
            // }
            // }
            onSubmit={async (value) => {
              SetButtonText("Submitting ...");
             try {
               handleFile();
               console.log(value);
               let form = {
                 name: value.name,
                 email: value.email,
                 department: value.department,
                 semester: semester,
                 fileUrl: fileUrl
               }
               let data = await axios.post(`http://localhost:8000/student/uploadForm/${localStorage.userId}`, form);
               console.log(data);
               SetButtonText('submitted!!');
             } catch (error) {
               console.log(error);
             }

            }}
          >
            {(formik) => (
              <Form>

                <label htmlFor="name"></label>
                <Field as={TextField} style={marginBottom} name="name"
                  placeholder="name" fullWidth type="text"
                  label = "name"
                  />
                <ErrorMessage name="name" />
            
                <label htmlFor="email"></label>
                <Field as={TextField} style={marginBottom} name="email" placeholder="Email" fullWidth label="Email" type="email" />
                <ErrorMessage name="email" />

                <label htmlFor="programme"></label>
                <Field as={TextField} style={marginBottom}  name="programme" placeholder="programme" fullWidth label="Programme" type="text" />
                <ErrorMessage name="programme" />
            
                <label htmlFor="department"></label>
                <Field as={TextField} style={marginBottom}  name="department" placeholder="department" fullWidth label="department" type="text" />
                <ErrorMessage name="department" />
               
                <FormControl fullWidth variant="outlined" style={marginBottom}>
                  <InputLabel htmlFor="semester" id="demo-simple-select-label">Semester</InputLabel>
                  <Select 
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name = "semester"
                    value={semester}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>

                    {/* <option aria-label="None" value="" />
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value= "8">8</option> */}
                  </Select>
                </FormControl>
                 <input
                    style={{display:'none'}}
                    onChange={(e)=>setFile(e.target.files)}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                  <label htmlFor="contained-button-file">
                    <Button startIcon={<CloudUploadIcon />} style={marginBottom} variant="contained" color="primary" component="span">
                      Upload
                    </Button>
                </label>
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


export default RegistrationForm;



