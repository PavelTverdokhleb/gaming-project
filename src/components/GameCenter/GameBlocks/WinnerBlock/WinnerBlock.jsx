import React from 'react';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../../Buttons/AuthButton/AuthButton';
import PopperInfo from '../../../HelperComponents/PopperInfo/PopperInfo';

import VictoryIcon from '../../../../assets/image/victory_block.png';

import './WinnerBlock.scss';

const WinnerBlock = ({rematch, bet, error, friend_status}) => {
    return (
        <div className="block_center">
            <div className="content_center winner_block">
                <div className="block_wrapper">
                    <div className="title">You Won</div>
                    <div className="block_img_center">
                        <img src={VictoryIcon} alt="send icon"/>
                        <i></i>
                    </div>
                    <div className="center_mini">
                        <div className="info_center_mini">
                            <span className="red_text">+{bet} €</span>
                        </div>
                    </div>
                </div>
                <div className="text_account">
                    Added to your account
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

export default WinnerBlock;