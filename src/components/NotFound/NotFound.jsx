import React from 'react';
import AuthButton from '../Buttons/AuthButton/AuthButton';

import NotFoundIcon from '../../assets/image/404.svg';
import AppLogo from '../../assets/image/g_logo.svg';

import './NotFound.scss';

const NotFound = () => {
    return (
        <div className="page_not_found">
            <img src={AppLogo} className="not_found_logo" alt="app"/>
            <img src={NotFoundIcon} alt="not found"/>
            <h2>404</h2>
            <h4>Oh no! Page not found.</h4>
            <AuthButton
                variant="contained"
                type="link"
                to="/admin"
            >
                Back to Main Page
            </AuthButton>
        </div>
    );
};

export default NotFound;