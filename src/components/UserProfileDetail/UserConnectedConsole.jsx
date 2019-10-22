import React, {Fragment} from 'react';
import {getLogoConsole} from "../../helpers/functions";

const UserConnectedConsole = ({platforms, game}) => {
    return (
        <Fragment>
            {platforms.map(({id, name, profile_id, profile_link}, i) => {
                if(profile_id !== null) {
                    const title = name.toLowerCase();
                    return (
                        <div
                            key={i}
                            className={`user_platform_profile user_platform_profile_${title}`}
                        >
                            <div className="flex-center">
                                {getLogoConsole(title)}
                                <div className="user_platform_title">
                                    <span>Profile ID</span>
                                    <p>{profile_id}</p>
                                </div>
                                {game ?
                                    <div className="user_platform_profile_link">
                                        <a
                                            href={profile_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Open profile in web
                                        </a>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className={`game_profile_link ${game ? "game_profile_link_short" : ""}`}>
                                <a href={profile_link} target="_blank" rel="noopener noreferrer">
                                    {profile_link}
                                </a>
                            </div>
                        </div>
                    )
                } else  {
                    return null;
                }
            })}
        </Fragment>
    );
};

export default UserConnectedConsole;