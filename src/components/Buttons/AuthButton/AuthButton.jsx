import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import './AuthButton.scss';

const AuthButton = ({children, variant = 'contained', type = 'button', to, formAction, disabled, onClick, loading, classes = ''}) => {
    if(type === 'link') {
        return (
            <div className="auth_button_wrapper">
                <Button
                    component={Link}
                    to={to}
                    variant={variant}
                    classes={{
                        root: `auth_button auth_button_${variant} ${classes}`
                    }}
                >
                    {children}
                </Button>
            </div>
        );
    } else  {
        return (
            <div className="auth_button_wrapper">
                <Button
                    type={formAction ? 'submit' : 'button'}
                    variant={variant}
                    disabled={disabled}
                    onClick={onClick}
                    classes={{
                        root: `auth_button auth_button_${variant} ${classes}`
                    }}
                >
                    {loading
                        ? <CircularProgress size={24} />
                        : children
                    }
                </Button>
            </div>
        );
    }

};

export default AuthButton;