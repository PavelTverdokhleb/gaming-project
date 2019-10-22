import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getStatus } from "../../../helpers/functions";

import ArrowIcon from '../../../assets/image/arrow_dispute.svg';

import './DisputeItem.scss';

const DisputeItem = ({id, creation_date, game_name, platform_name, opponent, game_lobby, resolved, has_events}) => {
    const { avatar, username } = opponent;
    const { bet, my_result } = game_lobby;
    const status = (resolved && my_result) || 'pending';
    return (
        <div className="dispute_item_wrapper">
            <div>
                <div className="dispute_item_top_info">
                    <div className="flex-center-btw">
                        <span>Match ID #{game_lobby.id}</span>
                        <hr/>
                        <span>{moment(creation_date).format("DD.MM.YY")}</span>
                    </div>
                    {getStatus(status)}
                </div>
                <div className="dispute_item_main_info">
                    <div className="flex-center dispute_item_username">
                        <Avatar
                            classes={{
                                root: 'dispute_item_avatar'
                            }}
                            src={avatar}
                        />
                        <div className="dispute_item_opponent">
                            <span>Opponent:</span>
                            <p>{username}</p>
                        </div>
                    </div>
                    <p>{bet} €</p>
                </div>
            </div>
            <div className="flex-center-btw dispute_item_bottom_info">
                <div>
                    <span>Game:</span>
                    <p>{`${game_name} (${platform_name})`}</p>
                </div>
                <Link
                    to={`/admin/dispute-center/${id}`}
                >
                    {has_events ? <span className="dispute_has_events"></span> : null}
                    <img src={ArrowIcon} alt="arrow"/>
                </Link>
            </div>
        </div>
    );
};

export default DisputeItem;