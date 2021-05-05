import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input:{
    '& > *': {
      margin: theme.spacing(-1),
    },
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
        <Paper elevation={10} style={{height:'auto',margin:"-40px -10px"}}>
          
           <Grid   item xs={12} style={{display:"flex",margin:"2rem",flexDirection:'column',alignItems:'center',height:'250px',width:'auto',justifyContent:'center'}}>
            <Paper elevation={0}>
            <Avatar alt="Profile Photo" src="https://source.unsplash.com/random" style={{height:'200px',width:'200px' }} />
            </Paper>
            </Grid>
            <Grid container spacing={3}>
             <Grid item xs={4}>
              <Typography variant="body2" style={{fontSize:'1.5rem',display:'flex',justifyContent:'center',alignItem:'center'}}>
                          Username :
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <form className={classes.input} noValidate autoComplete="off">
              <TextField
               id="outlined-read-only-input"
                
               fullWidth 
               variant="outlined" 
               value={user.name}
                InputProps={{
                  readOnly: true,
                }} /> 
            </form>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" style={{fontSize:'1.5rem',display:'flex',justifyContent:'center',alignItem:'center'}}>
                          Email :
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <form className={classes.input} noValidate autoComplete="off">
              <TextField
               id="outlined-read-only-input"
                
               fullWidth 
               variant="outlined" 
               value={user.email}
                InputProps={{
                  readOnly: true,
                }} /> 
            </form>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" style={{fontSize:'1.5rem',display:'flex',justifyContent:'center',alignItem:'center'}}>
                          Program :
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <form className={classes.input} noValidate autoComplete="off">
              <TextField
               id="outlined-read-only-input"
                
               fullWidth 
               variant="outlined" 
               value='Btech'
               InputProps={{
                  readOnly: true,
                }} /> 
            </form>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" style={{fontSize:'1.5rem',display:'flex',justifyContent:'center',alignItem:'center'}}>
                          Department :
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <form className={classes.input} noValidate autoComplete="off">
              <TextField
               id="outlined-read-only-input"
                
               fullWidth 
               variant="outlined" 
               value={user.department}
                InputProps={{
                  readOnly: true,
                }} /> 
            </form>
            </Grid>
            <Grid item xs={4}>
              
            </Grid>
            <Grid item xs={8}>
            
            </Grid>
            

            </Grid>
        </Paper>
      </Grid>
    </div>
    </>
  );
};
  
export default About;