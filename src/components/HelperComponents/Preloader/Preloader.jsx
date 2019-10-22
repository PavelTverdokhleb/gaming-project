import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Preloader.scss';

const Preloader = (props) => {
    return (
        <div className="preloader_wrapper">
            <LinearProgress />
        </div>
    );
};

export default Preloader;