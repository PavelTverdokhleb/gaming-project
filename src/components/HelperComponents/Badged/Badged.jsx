import React from 'react';
import Badge from '@material-ui/core/Badge';
import './Badged.scss';

const Badged = ({content, children, classes = 'notifications_badge'}) => {
    return (
        <Badge
            badgeContent={content}
            classes={{
                root: classes,
                badge: 'custom_badge'
            }}
        >
            {children}
        </Badge>
    );
};

export default Badged;