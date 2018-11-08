import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggle from '../../Navigation/SideDrawer/MenuToggle/MenuToggle';
import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuToggle
            clicked={props.toggleSideBar} />
        <div className={classes.Logo}>
            <Logo height='100%'/>
        </div>
        <nav className={classes.Desktop}>
            <NavigationItems />
        </nav>
    </header>

);

export default toolbar;
