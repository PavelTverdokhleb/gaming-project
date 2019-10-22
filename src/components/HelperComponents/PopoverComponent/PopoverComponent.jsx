import React from 'react';
import Popover from '@material-ui/core/Popover';
import './PopoverComponent.scss';

const PopoverComponent = (
    {
        anchor,
        onClose,
        children,
        anchorOrigin = {vertical: 'bottom', horizontal: 'right'},
        transformOrigin = {vertical: 'top', horizontal: 'right'},
        classes = 'popover_wrapper'
    }
) => {
    const open = Boolean(anchor);
    return (
        <Popover
            open={open}
            anchorEl={anchor}
            onClose={onClose}
            anchorOrigin={{
                vertical: anchorOrigin.vertical,
                horizontal: anchorOrigin.horizontal
            }}
            transformOrigin={{
                vertical: transformOrigin.vertical,
                horizontal: transformOrigin.horizontal,
            }}
            classes={{
                paper: classes
            }}
        >
            {children}
        </Popover>
    );
};

export default PopoverComponent;