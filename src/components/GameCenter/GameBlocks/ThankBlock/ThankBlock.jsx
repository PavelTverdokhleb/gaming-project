import React from 'react';
import { Link } from 'react-router-dom';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../../Buttons/AuthButton/AuthButton';

import AppriIcon from '../../../../assets/image/thanks_block.svg';

import './ThankBlock.scss';

const ThankBlock = () => {
    return (
        <div className="block_center">
            <div className="content_center thank_block">
                <div className="block_wrapper">
                    <div className="title">Thank you!</div>
                    <div className="block_img_center">
                        <img src={AppriIcon} alt="send icon"/>
                        <i></i>
                    </div>
                    <div className="info_center">
                        Our customercare will check the submitted <br/> evidence and reward the winner within 24 hours
                    </div>
                </div>
                <div className="block_center_btn">
                    <Link to="/admin/game-center">
                        <DefaultButton
                            type="red"
                        >
                            NEW GAME
                        </DefaultButton>
                    </Link>
                    <AuthButton
                        variant="outlined"
                        type="link"
                        to="/admin/dispute-center"
                    >
                        OPEN DISPUTE CENTER
                    </AuthButton>
                </div>
                <span className="description_block">We Add your opponent to your friend list</span>
            </div>
        </div>
    );
};

export default ThankBlock;