import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';

import './SnackBar.scss';

const SnackBar = ({open, onClose, children, classes = 'default'}) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            onClose={onClose}
            message={
                <span id="message-id">{children}</span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
            classes={{
                root: `snack_root ${classes}_snack`
            }}
        />
    );
};

export default SnackBar;