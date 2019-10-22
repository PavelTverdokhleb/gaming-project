import React from 'react';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './PopperInfo.scss';

const PopperInfo = ({id, open, anchorEl, clickAway, children, options, classes = ''}) => {
    return (
        <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            transition
            placement="bottom-start"
            style={{
                zIndex: 999
            }}
        >
            {({ TransitionProps }) => (
                <ClickAwayListener onClickAway={clickAway}>
                    <Fade {...TransitionProps} timeout={350}>
                        <div className={`popper_wrapper ${classes}`}>
                            {children}
                        </div>
                    </Fade>
                </ClickAwayListener>
            )}
        </Popper>
    );
};

export default PopperInfo;