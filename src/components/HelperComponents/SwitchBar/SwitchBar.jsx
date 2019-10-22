import React from 'react';
import Switch from '@material-ui/core/Switch';
import './SwitchBar.scss';

const SwitchBar = ({checked, value, onChange}) => {
    return (
        <Switch
            classes={{
                root: 'switch_wrapper',
                switchBase: "switch_base",
                bar: "switch_bar",
                icon: "switch_icon",
                iconChecked: "switch_icon_checked",
                checked: "switch_checked",
            }}
            disableRipple
            disabled={checked === undefined}
            checked={checked || false}
            onChange={onChange(value)}
            value={value}
        />
    );
};

export default SwitchBar;