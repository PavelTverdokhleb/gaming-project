import React from 'react';
import Logo from '../AuthLogo/AuthLogo';
import './Head.scss';

const Head = (props) => {
    return (
        <header className="auth_head">
            <Logo/>
            {/*<div className="auth_links">*/}
                {/*<span>Terms of conditions</span>*/}
                {/*<span>About APP</span>*/}
                {/*<span>FAQ</span>*/}
                {/*<span>Contact us</span>*/}
            {/*</div>*/}
        </header>
    );
};

export default Head;