import React from 'react';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import Clipboard from 'react-clipboard.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import InviteIcon from '../../../assets/image/invite.svg';

import './InviteCodeBlock.scss';

const InviteCodeBlock = ({code, reward}) => {
    if(!code) return (
        <section className="invite_code_block invite_code_loading">
            <CircularProgress/>
        </section>
    );
    return (
        <section className="invite_code_block">
            <div className="invite_code_info">
                <img src={InviteIcon} alt="invite"/>
                <div className="invite_code_text">
                    <p>Invite friends with this code:</p>
                    <h5>{code}</h5>
                </div>
                <Clipboard
                    component="div"
                    data-clipboard-text={`${code} - Please, enter this code at your Wallet screen to get ${reward} extra euros`}
                >
                    <AuthButton
                        variant="outlined"
                    >
                        Copy Code
                    </AuthButton>
                </Clipboard>
            </div>
            <div className="invite_code_earn">
                <p>You've earned: <span>{`${reward} Euro`}</span></p>
            </div>
        </section>
    );
};

export default InviteCodeBlock;