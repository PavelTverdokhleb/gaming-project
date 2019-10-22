import React from 'react';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../../Buttons/AuthButton/AuthButton';
import PopperInfo from '../../../HelperComponents/PopperInfo/PopperInfo';

import CoatIcon from '../../../../assets/image/coat.png';

import './DrawBlock.scss';

const DrawBlock = ({rematch, error, friend_status}) => {
    return (
        <div className="block_center">
            <div className="content_center draw_block">
                <div className="block_wrapper">
                    <div className="title">Draw</div>
                    <div className="block_img_center">
                        <img src={CoatIcon} alt="send icon"/>
                        <i></i>
                    </div>
                    <div className="info_center">
                        Both players will get a full refund of their entry fee. <br/>
                        The platform fee of 1€ will not be refunded.
                    </div>
                </div>
                <div className="block_center_btn">
                    <DefaultButton
                        type="red"
                        onClick={rematch}
                    >
                        INSTANT REMATCH
                    </DefaultButton>
                    <AuthButton
                        variant="outlined"
                        type="link"
                        to="/admin/game-center"
                    >
                        NEW GAME
                    </AuthButton>
                </div>
                <span className="description_block">{friend_status === 'become_friends' ? 'All opponents are added to your friends list' : ' '}</span>
            </div>
            <PopperInfo
                open={error !== null}
                anchorEl={document.getElementsByClassName('default_button_red')[0]}
                classes="instant_rematch_popper"
            >
                {error}
            </PopperInfo>
        </div>
    );
};

export default DrawBlock;