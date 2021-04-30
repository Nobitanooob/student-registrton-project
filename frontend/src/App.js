import React, { useState, useEffect } from "react";
import PageRoutes from "./PageRoutes";
import Login from "./components/login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
   
   // console.log("this is user id in app ",userId)
  }, [userId]);


  const handleIsLogin = (e) => {
    setIsLoggedIn(e);
    console.log("is login",isLoggedIn);
  };
  const handleIsStudent = (e) => {
    setIsStudent(e);
    console.log("isStudent is",isStudent);
  };
  const handleUser =  (id) => {
      setUserId(id);
    console.log("id is",userId);
  };

  if (!isLoggedIn) {
    return (
      <Login
        handleUser={handleUser}
        handleIsLogin={handleIsLogin}
        handleIsStudent={handleIsStudent}
        
        isStudentState={isStudent}
      />  
    );
  } else {
    return <div>{userId}</div>
    // return <PageRoutes isStudent={isStudent} userId={userId} />;
  } 

}

export default App;