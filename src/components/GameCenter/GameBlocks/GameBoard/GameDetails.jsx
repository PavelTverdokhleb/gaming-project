import React from 'react';
import { getConsoleIconBig } from "../../../../helpers/functions";

const GameDetails = ({bet, logo, platform }) => {
    return (
        <div className="game_board_details_game">
                <img src={logo} alt="game logo"/>
            <div className="game_details_bottom">
                <div>
                    <p>Game Stake</p>
                    <span className="game_details_stack">{bet} €</span>
                </div>
                <hr/>
                <div>
                    <p>Platform</p>
                    {getConsoleIconBig(platform.name.toLowerCase())}
                    <span className="game_details_platform_name">{platform.name}</span>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;