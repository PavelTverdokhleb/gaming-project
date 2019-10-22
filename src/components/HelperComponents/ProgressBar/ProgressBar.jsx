import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './ProgressBar.scss';

const ProgressBar = ({progress, current, total}) => {
    return (
        <div className="progress_bar_wrapper">
            <div className="progress_info">
                <span>{current}</span>
                <span>{total}</span>
            </div>
            <LinearProgress
                variant="determinate"
                value={progress}
                classes={{
                    root: 'progress_bar'
                }}
            />

        </div>
    );
};

export default ProgressBar;