import React from 'react';
// import './PageRoutes.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages';
import About from './components/Pages/about';
import Events from './components/Pages/events';
import AnnualReport from './components/Pages/annual';
import Teams from './components/Pages/team';
import Blogs from './components/Pages/blogs';
import SignUp from './components/Pages/signup';

function PageRoutes() {
return (
	<Router>
	<Navbar />
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/about' component={About} />
		<Route path='/events' component={Events} />
		<Route path='/annual' component={AnnualReport} />
		<Route path='/team' component={Teams} />
		<Route path='/blogs' component={Blogs} />
		<Route path='/sign-up' component={SignUp} />
	</Switch>
	</Router>
);
}

export default PageRoutes;
