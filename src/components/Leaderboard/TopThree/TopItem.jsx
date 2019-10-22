import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import PointsBlock from '../../AppBlocks/PointsBlock/PointsBlock';
import CrownImg from '../../../assets/image/crown.png';

function getPlace(place) {
    if(place === 1) {
        return (
            <div>
                <img src={CrownImg} alt="crown"/>
            </div>
        );
    } else {
        return (
            <div className="place_circle">
                {place}
            </div>
        );
    }
}

const TopItem = ({id, earnings, avatar, username, games_played, place, style, my}) => {
    const name = my ? 'You' : username;
    return (
        <div className={`top_item_block leader_position${place}`} style={style}>
            <div className="place_leader_block">
                {getPlace(place)}
                <span>#{place} Place</span>
            </div>
            <Avatar
                src={avatar}
                classes={{
                    root: 'top_leaderboard_avatar'
                }}
            />
            <PointsBlock
                value={earnings}
            />
            <p>{name}</p>
            <span>{games_played} games played</span>
            <Link
                className="profile_button"
                to={my ? '/admin/profile' : `/admin/leaderboard/${id}`}
            >
                View Profile
            </Link>
        </div>
    );
};

export default TopItem;