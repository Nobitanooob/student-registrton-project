import React from 'react';
// import './PageRoutes.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


// for student 
import Profile from './components/Pages/student/profile';
import RegistrationForm from './components/Pages/student/registrationForm';
import Status from './components/Pages/student/status';
import UpdateProfile from './components/Pages/student/updateProfile';
 // for teacher
import ProfileTeacher from './components/Pages/teacher/profileTeacher';
import AddNewUser from './components/Pages/teacher/addNewUser';
import PendingRegistration from './components/Pages/teacher/pendingRegistration';
import SearchUser from './components/Pages/teacher/searchUser';
import Update from './components/Pages/teacher/update';



function PageRoutes(props) {  //props : userId isStudent
	if (props.isStudent)   //show registration form by default
	{
		return (
			<Router>
			<Navbar isStudent={props.isStudent} userId={props.userId}/>
			<Switch>
				<Route path='/' exact component={RegistrationForm} />
				<Route path='/profile' component={Profile} />
				<Route path='/status' component={Status} />
				<Route path='/updateProfile' component={UpdateProfile} />
			</Switch>
			</Router>
		);
	}
	else {
		return (
			<Router>
			<Navbar isStudent={props.isStudent} userId={props.userId}/>
			<Switch>
				<Route path='/' exact component={PendingRegistration} />
				<Route path='/profile' component={ProfileTeacher} />
				<Route path='/addNewUser' component={AddNewUser} />
				<Route path='/search' component={SearchUser} />
				<Route path='/update' component={Update} />
			</Switch>
			</Router>
		);
	}

}

export default PageRoutes;