import React from 'react';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';
import { Link } from 'react-router-dom';

import NotificationExpiredIcon from '../../../assets/image/notification_expired.svg';

import './NotificationExpired.scss';

const NotificationExpired = (props) => {
    return (
        <div className="block_center">
            <div className="notification_expired_wrapper">
                <img src={NotificationExpiredIcon} alt="notification expired"/>
                <p>Notification has expired</p>
                <Link to="/admin/game-center">
                    <DefaultButton
                        type="green"
                    >
                        Go to main page
                    </DefaultButton>
                </Link>
            </div>
        </div>
    );
};

export default NotificationExpired;