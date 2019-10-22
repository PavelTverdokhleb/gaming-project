import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import './SetStake.scss';

const SetStake = ({stake, onIncrease, onDecrease, fee}) => (
    <div className="dashboard_block stake_block">
        <div>
            <h5>Select your stake:</h5>
            <div className="stake_content">
                <IconButton
                    classes={{
                        root: "btn_nav"
                    }}
                    onClick={onDecrease}
                >
                    <RemoveIcon/>
                </IconButton>
                <span id="select_stake_game" className="stake_value">
                    {stake} €
                </span>
                <IconButton
                    classes={{
                        root: "btn_nav"
                    }}
                    onClick={onIncrease}
                >
                    <AddIcon/>
                </IconButton>
            </div>
        </div>
        <div className="stake_bottom_block">
            <p>Platform Fee: {fee} Euro</p>
        </div>
    </div>
);

export default (SetStake);