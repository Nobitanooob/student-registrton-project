import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import "../../App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input:{
    padding:0
  },
  paper: {
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin:'-0.2rem 0.6rem'
  },
}));

const About = () => {
  let [user, setUser] = useState('');
  const classes=useStyles();

  useEffect(() => {
    // getting user details by api call
    axios.get(`http://localhost:8000/user/${localStorage.getItem('userId')}`)
      .then((data) => {
        console.log(data.data.user);
        setUser(data.data.user);
      });
  },[]);

  return (
    <>
    <div className={classes.root}>
      <Grid>
        <Paper elevation={10}style={{padding:"0 2rem 2rem 0"}}>
            <Grid item style={{display:"flex",justifyContent:"center",padding:"1rem"}} >
            <Avatar alt="Profile Photo" src="https://source.unsplash.com/random" style={{height:'100px',width:'100px' }} />
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={4} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography variant="body2" >
                            Name :
                  </Typography>
              </Grid>
              <Grid item xs={8} >
              <form noValidate autoComplete="off">
                <TextField
                as="input"
                id="outlined-read-only-input"
                fullWidth 
                variant="outlined" 
                value={user.name}
                  InputProps={{
                    readOnly: true,
                  }} /> 
              </form>
              </Grid>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={4} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography variant="body2" >
                            Email :
                  </Typography>
              </Grid>
              <Grid item xs={8} >
              <form noValidate autoComplete="off">
                <TextField
                as="input"
                id="outlined-read-only-input"
                fullWidth 
                variant="outlined" 
                value={user.email}
                  InputProps={{
                    readOnly: true,
                  }} /> 
              </form>
              </Grid>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={4} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography variant="body2" >
                        Program :
                  </Typography>
              </Grid>
              <Grid item xs={8} >
              <form noValidate autoComplete="off">
                <TextField
                as="input"
                id="outlined-read-only-input"
                fullWidth 
                variant="outlined" 
                value="Btech"
                  InputProps={{
                    readOnly: true,
                  }} /> 
              </form>
              </Grid>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={4} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography variant="body2" >
                      Department :
                  </Typography>
              </Grid>
              <Grid item xs={8} >
              <form noValidate autoComplete="off">
                <TextField
                as="input"
                id="outlined-read-only-input"
                fullWidth 
                variant="outlined" 
                value={user.department}
                  InputProps={{
                    readOnly: true,
                  }} /> 
              </form>
              </Grid>
            </Grid>
         </Paper>
        </Grid>
    </div>
    </>
  );
};
  
export default About;