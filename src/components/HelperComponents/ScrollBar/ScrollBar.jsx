import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './ScrollBar.scss';

function renderThumb({ style, ...props }) {
    let thumbStyle = {
        width: '10px'
    };
    return (
        <div
            className="custom_scrollbar_thumb"
            style={{...style, ...thumbStyle}}
            {...props}
        />
    );
}

function renderTrack({ style, ...props }) {
    let trackStyle = {
        top: '2px',
        right: '2px',
        bottom: '2px',
        width: '10px'
    };
    return (
        <div
            className="custom_scrollbar_track"
            style={{...style, ...trackStyle}}
            {...props}
        />
    );
}


const ScrollBar = ({children, onScroll, maxHeight = "calc(100vh - 260px)"}) => {
    return (
        <Scrollbars
            renderThumbVertical={renderThumb}
            renderTrackVertical={renderTrack}
            onScroll={onScroll}
            hideTracksWhenNotNeeded
            autoHeight
            autoHeightMax={maxHeight}
        >
            {children}
        </Scrollbars>
    );
};

export default ScrollBar;