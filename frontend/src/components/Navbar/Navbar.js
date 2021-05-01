import React,{useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import {SidebarStudentData} from './SidebarStudentData';
import {SidebarTeacherData} from './SidebarTeacherData';
import './Navbar.css';
import { Link } from 'react-router-dom';
import {IconContext} from 'react-icons';




const Navbar = (props) => {
	const btnStyle={
		height:50,
		width:100,
		color:'blue',
	};
	
	const [sidebar,setSidebar]=useState(false);
    const showSidebar=()=>setSidebar(!sidebar);
	const handleSignout = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('userType');
		// reload the window after logout to return to app begin
		window.location.reload();
		return;
	}
	if (props.isStudent)
	{
		return (
			<>
			<IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                <div className="btnDiv">
					<button type="submit" onClick={handleSignout} className="btn" style={btnStyle}>LogOut</button>
				</div>

            </div>
            <nav className={sidebar?'nav-menu active':'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose/>
                        </Link>

                    </li>
                    {SidebarStudentData.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        	</IconContext.Provider>


			</>
		);
				
	}
	else
	{

		return (
			<>
				<IconContext.Provider value={{color:'#fff'}}>
                    <div className="navbar">
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaBars onClick={showSidebar}/>
                        </Link>
                        <div className="btnDiv">
                            <button type="submit" onClick={handleSignout} className="btn" style={btnStyle}>LogOut</button>
                        </div>
                        
                    </div>
                    <nav className={sidebar?'nav-menu active':'nav-menu'}>
                        <ul className="nav-menu-items" onClick={showSidebar}>
                            <li className="navbar-toggle">
                                <Link to="#" className="menu-bars">
                                    <AiIcons.AiOutlineClose/>
                                </Link>

                            </li>
                            {SidebarTeacherData.map((item,index)=>{
                                return(
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
        	</IconContext.Provider>

			</>
		);
	}
};

export default Navbar;
