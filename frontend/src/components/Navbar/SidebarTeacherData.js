import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
export const SidebarTeacherData=[
    {
        title:'Registration Forms',
        path:'/',
        icon:<AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Profile',
        path:'/profile',
        icon:<AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Add User',
        path:'/addNewUser',
        icon:<IoIcons.IoIosPaper/>,
        cName:'nav-text'
    },
    {
        title:'Update Profile',
        path:'/update',
        icon:<FaIcons.FaCartPlus/>,
        cName:'nav-text'
    },
    {
        title:'Search',
        path:'/search',
        icon:<FaIcons.FaCartPlus/>,
        cName:'nav-text'
    },
];