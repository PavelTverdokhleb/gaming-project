import React from 'react';
import LogoText from '../../../assets/image/logo_text.svg';
import LogoImg from '../../../assets/image/logo_big.png';
import './AuthLogo.scss';

const AuthLogo = () => {
    return (
        <div className="logo_wrapper">
            <img src={LogoImg} alt="big logo img"/>
            <img src={LogoText} alt="big logo text"/>
        </div>
    );
};

export default AuthLogo;