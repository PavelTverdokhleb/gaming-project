import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import './TooltipMessage.scss';

const TooltipMessage = ({text, children, error = false, delay = 1000, position = 'top', classes = 'auth_tooltip_popper'}) => {
    return (
        <Tooltip
            title={text}
            placement={position}
            enterDelay={delay}
            leaveDelay={200}
            disableTouchListener
            disableFocusListener
            classes={{
                tooltip: error ? "error_message_tooltip" : "message_tooltip",
                popper: `message_popper ${classes}`
            }}
        >
            {children}
        </Tooltip>
    );
};

export default TooltipMessage;
