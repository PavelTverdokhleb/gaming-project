import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import Example from '../../../assets/image/how_to_example.png';
import Example2 from '../../../assets/image/how_to_example2.png';
import PlayIcon from '../../../assets/image/play_icon.svg';

import './GuidesBlock.scss';

const GuidesBlock = (props) => {
    return (
        <div className="guides_wrapper">
            <h4 className="block_header">How to play:</h4>
            <div className="guide_item">
                <img src={Example} alt="example"/>
                <div className="item_content">
                    <IconButton>
                        <img src={PlayIcon} alt="play icon"/>
                    </IconButton>
                    <p>Watch - How To Be A Host Of The Game</p>
                </div>
            </div>
            <div className="guide_item">
                <img src={Example2} alt="example2"/>
                <div className="item_content">
                    <IconButton>
                        <img src={PlayIcon} alt="play icon"/>
                    </IconButton>
                    <p>Watch - How to find game ID</p>
                </div>
            </div>
        </div>
    );
};

export default GuidesBlock;