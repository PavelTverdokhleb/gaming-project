import React from 'react';
import Select from 'react-select';
import { getSelectPlatformIcon } from "../../../helpers/functions";

import './SelectConsole.scss';

const SelectConsole = ({data, currentGame, value, onChange}) => {
    let options = data
        .map(el => ({
            value: el.id,
            label: <p className="my_label">{getSelectPlatformIcon(el.name.toLowerCase())}<span>({el.profile_id !== null ? el.profile_id : 'Not connected'})</span></p>,
            profile: el.profile_id
        }))
        .filter(el => currentGame.platforms.includes(el.value) && value !== null && el.value !== value.value);
    return (
        <Select
            id="select_console_game"
            value={value}
            className="select-container"
            classNamePrefix="select"
            options={options}
            onChange={onChange}
            isSearchable={false}
            isDisabled={!options.length > 0}
        />
    );
};

export default SelectConsole;