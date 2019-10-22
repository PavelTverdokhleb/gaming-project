import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './DialogComponent.scss';

const DialogComponent = ({open, onClose, children}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{root: 'default_dialog_root'}}
        >
            <div className="dialog_wrapper">
                {children}
            </div>
        </Dialog>
    );
};

export default DialogComponent;