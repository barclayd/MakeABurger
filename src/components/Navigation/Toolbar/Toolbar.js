import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggle from '../../Navigation/SideDrawer/MenuToggle/MenuToggle';
import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.menuToggle}>
            <MenuToggle
                isSideDrawOpen={props.openSideDrawer}
                clicked={props.toggleSideBar} />
        </div>
        <div className={classes.Logo}>
            <Logo height='80%'/>
        </div>
        <nav className={classes.Desktop}>
            <NavigationItems />
        </nav>
    </header>

);

export default toolbar;
