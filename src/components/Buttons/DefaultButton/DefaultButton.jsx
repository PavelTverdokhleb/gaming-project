import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import './DefaultButton.scss';

const DefaultButton = ({children, variant = 'contained', type, to, formAction, disabled, onClick, loading, size = 'big'}) => {
    return (
        <div className="default_button_wrapper">
            <Button
                type={formAction ? 'submit' : 'button'}
                variant={variant}
                disabled={disabled || loading}
                onClick={onClick}
                classes={{
                    root: `default_button default_button_${type} default_button_${size}`
                }}
            >
                {loading
                    ? <CircularProgress size={24} classes={{root: 'btn_progress'}} />
                    : children
                }
            </Button>
        </div>
    );
};

export default DefaultButton;