import React, { useEffect, useState } from 'react';
import axios from 'axios';




const About = () => {
  let [user, setUser] = useState('');
  

  useEffect(() => {
    // getting user details by api call
    axios.get(`http://localhost:8000/user/${localStorage.getItem('userId')}`)
      .then((data) => {
        console.log(data.data.user);
        setUser(data.data.user);
      });
  },[]);

  return (
    <div className="profile"
      style={{
        display: 'flex',
        justifyContent: 'Right',
        alignItems: 'Right',

      }}>
      <p>{user.name}</p>      
    </div>
  );
};
  
export default About;