import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import PointsBlock from '../../AppBlocks/PointsBlock/PointsBlock';

import './LeaderboardTable.scss';

const LeaderboardTable = ({data}) => {
    return (
        <div className="leaderboard_table_wrapper leaderboard_columns">
            <div className="leaderboard_table_head">
                <div className="leaderboard_table_row">
                    <p>Rank</p>
                    <p>User</p>
                    <p>Stake Range</p>
                    <p></p>
                    <p>Points</p>
                </div>
            </div>
            <div className="leaderboard_table_body">
                {data.map(({id, avatar, username, earnings, min_bet, max_bet, my}, i) => {
                    const name = my ? 'You' : username;
                    return (
                        <div className="leaderboard_table_row" key={id}>
                            <div className="flex-center leaderboard_table_avatar_wrapper">
                                <span>#{i + 4}</span>
                                <Avatar
                                    src={avatar}
                                    classes={{
                                        root: 'leaderboard_table_avatar'
                                    }}
                                />
                            </div>
                            <div>
                                <p className="leaderboard_table_username">
                                    {name}
                                </p>
                            </div>
                            <div>
                                <p className="stake_range_label">
                                    <span>Stake Range:&nbsp;</span>
                                    {min_bet === null || max_bet === null ?
                                        '-'
                                        :
                                        `${min_bet}-${max_bet} €`
                                    }
                                </p>
                            </div>
                            <div>
                                <Link
                                    className="profile_button"
                                    to={my ? '/admin/profile' : `/admin/leaderboard/${id}`}
                                >
                                    View Profile
                                </Link>
                            </div>
                            <PointsBlock
                                value={earnings}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LeaderboardTable;