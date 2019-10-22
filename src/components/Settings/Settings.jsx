import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SettingsNav from './SettingsNav/SettingsNav';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import PasswordSettings from './PasswordSettings/PasswordSettings';
import ApplicationSettings from './ApplicationSettings/ApplicationSettings';
import NotFound from '../NotFound/NotFound';

import './Settings.scss';

const Settings = ({match}) => {
    return (
        <div className="settings_wrapper blocks_row_wrapper">
            <SettingsNav/>
            <section className="settings_block">
                <Switch>
                    <Route path={match.url} exact component={ProfileSettings} />
                    <Route path={`${match.url}/password`} component={PasswordSettings} />
                    <Route path={`${match.url}/application`} component={ApplicationSettings} />
                    <Route component={NotFound} />
                </Switch>
            </section>
        </div>
    );
};

export default Settings;