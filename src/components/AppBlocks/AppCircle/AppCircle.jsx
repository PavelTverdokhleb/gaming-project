import React from 'react';
import GLogo from '../../../assets/image/g_logo.svg';
import './AppCircle.scss';

const AppCircle = ({image}) => {
    return (
        <div className="app-circle">
            <img src={image ? image : GLogo} alt="app logo"/>
        </div>
    );
};

export default AppCircle;