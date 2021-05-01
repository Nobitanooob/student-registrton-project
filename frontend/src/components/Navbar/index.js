import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';



const Navbar = (props) => {
	
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
			<Nav>
 				<Bars />
				<NavMenu>
				<NavLink to='/' activeStyle>
					Registration form
				</NavLink>
				<NavLink to='/profile' activeStyle>
					Profile
				</NavLink>
				<NavLink to='/status' activeStyle>
					Status
				</NavLink>
				<NavLink to='/updateProfile' activeStyle>
					Update Profile
				</NavLink>
				{/* Second Nav */}
				{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
				</NavMenu>
				<NavBtn>
				<NavBtnLink onClick={handleSignout}>LogOut</NavBtnLink>
				</NavBtn>
			</Nav>
			</>
		);
				
	}
	else
	{

		return (
			<>
				<Nav>
					<Bars />
					<NavMenu>
					<NavLink to='/' activeStyle>
							Registration Forms
				    </NavLink>
					<NavLink to='/profile' activeStyle>
							Profile
					</NavLink>
					<NavLink to='/addNewUser' activeStyle>
							Add User
					</NavLink>
					<NavLink to='/update' activeStyle>
							Update Profile
					</NavLink>
					<NavLink to='/search' activeStyle>
						 Search
					</NavLink>
						{/* Second Nav */}
						{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
					</NavMenu>
					<NavBtn>
					<NavBtnLink onClick={handleSignout}>LogOut</NavBtnLink>
					</NavBtn>
				</Nav>
			</>
		);
	}
};

export default Navbar;
