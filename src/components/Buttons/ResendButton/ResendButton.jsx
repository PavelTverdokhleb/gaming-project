import React from 'react';
import './ResendButton.scss';

const ResendButton = ({onClick, children, disabled}) => {
    return (
        <button
            className="resend_button"
            disabled={disabled}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
};

export default ResendButton;