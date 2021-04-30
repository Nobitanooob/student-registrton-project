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
				<NavBtnLink to='/signout'>LogOut</NavBtnLink>
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
						<NavBtnLink to='/signout'>LogOut</NavBtnLink>
					</NavBtn>
				</Nav>
			</>
		);
	}
};

export default Navbar;
