import React from 'react';

import TriangleIcon from '@material-ui/icons/ChangeHistory';
import XIcon from '@material-ui/icons/Close';
import OvalIcon from '@material-ui/icons/FiberManualRecordOutlined';
import RectIcon from '@material-ui/icons/CropSquare';

import './Loader.scss';

const Loader = (props) => {
    return (
        <div className="loader_wrapper">
            <div className="loader_container">
                <div className="loader_item">
                    <TriangleIcon/>
                </div>
                <div className="loader_item">
                    <OvalIcon/>
                </div>
                <div className="loader_item">
                    <XIcon/>
                </div>
                <div className="loader_item">
                    <RectIcon/>
                </div>
            </div>
        </div>
    );
};

export default Loader;