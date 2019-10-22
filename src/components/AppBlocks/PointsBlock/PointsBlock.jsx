import React from 'react';
import './PointsBlock.scss';

const PointsBlock = ({value, type = 'default'}) => {
    if(type === 'default') {
        return (
            <div className="points_block points_default">
                <span>{Number(value)} €</span>
            </div>
        );
    } else {
        return (
            <div className="points_block points_friends">
                <span>{Number(value)} €</span>
            </div>
        );
    }

};

export default PointsBlock;