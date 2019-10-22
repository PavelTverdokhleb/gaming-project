import React from 'react';
import { NavLink } from 'react-router-dom';

const InfoNav = (props) => {
    return (
        <nav className="settings_block settings_nav_wrapper">
            <NavLink
                to="/admin/info"
                exact
                activeClassName="active"
            >
                FAQ
            </NavLink>
            <NavLink
                to="/admin/info/privacy-policy"
                activeClassName="active"
            >
                Privacy Policy
            </NavLink>
            <NavLink
                to="/admin/info/terms-conditions"
                activeClassName="active"
            >
                Terms & Conditions
            </NavLink>
            <NavLink
                to="/admin/info/game-rules"
                activeClassName="active"
            >
                Game Rules & Tutorials
            </NavLink>
            <NavLink
                to="/admin/info/support"
                activeClassName="active"
            >
                Support
            </NavLink>
        </nav>
    );
};

export default InfoNav;