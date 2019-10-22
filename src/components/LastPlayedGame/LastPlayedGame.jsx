import React from 'react';
import AuthButton from '../Buttons/AuthButton/AuthButton';
import Avatar from '@material-ui/core/Avatar';
import PopperInfo from '../HelperComponents/PopperInfo/PopperInfo';

import { getConsoleIcon } from "../../helpers/functions";
import { getLastGameStatusImg } from "../../helpers/functions";

import PointsIcon from '../../assets/image/points_small.svg';

import './LastPlayedGame.scss';

const LastPlayedGame = ({logo, bet, name, platform, opponent, result, rematch, error}) => {
    return (
        <section className="last_played_block">
            <div className="last_played_game_logo">
                <img src={logo} alt="last game"/>
            </div>
            <div className="played_game_info">
                <div className="flex-center-btw info_half_blocks">
                    <div>
                        <span className="default_label">
                            Stake size:
                        </span>
                        <p className="stake_value">
                            {bet} €
                        </p>
                    </div>
                    <div>
                        <span className="default_label">
                            Platform:
                        </span>
                        <p>{platform}</p>
                    </div>
                </div>
                <div className="flex-center-btw">
                    <div>
                        <span className="default_label">
                            Game:
                        </span>
                        <p>{name}</p>
                    </div>
                    <AuthButton
                        classes="last_played_game_rematch"
                        variant="outlined"
                        onClick={rematch}
                    >
                        Rematch
                    </AuthButton>
                </div>
            </div>
            <div className="played_game_opponent">
                 <span className="default_label">
                     Your Opponent:
                 </span>
                <div className="flex-center">
                    <Avatar
                        src={opponent.avatar}
                        classes={{
                            root: 'opponent_avatar'
                        }}
                    />
                    <div className="opponent_profiles">
                        <div>
                            <div className="opponent_profile_image_wrapper">
                                <img src={PointsIcon} alt="points icon"/>
                            </div>
                            <span>{opponent.username}</span>
                        </div>
                        {opponent.profile_id !== null ?
                            <div>
                                <div className="opponent_profile_image_wrapper">
                                    {getConsoleIcon(platform.toLowerCase())}
                                </div>
                                <span>{opponent.profile_id}</span>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="played_game_status">
                {getLastGameStatusImg(result)}
            </div>
            <PopperInfo
                open={error !== null}
                anchorEl={document.getElementsByClassName('last_played_game_rematch')[0]}
            >
                {error}
            </PopperInfo>
        </section>
    );
};

export default LastPlayedGame;