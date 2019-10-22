import React, {Fragment} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Head from "../../components/Auth/Head/Head";
import Login from "../../components/Auth/Login/Login";
import Register from "../../components/Auth/Register/Register";
import RecoveryEmail from "../../components/Auth/PasswordRecovery/RecoveryEmail";
import FBAuth from "../../components/Auth/FBAuth/FBAuth";
import CodeConfirm from "../../components/Auth/CodeConfirm/CodeConfirm";
import SetNewPassword from "../../components/Auth/PasswordRecovery/SetNewPassword";
import TwitchAuth from '../../components/Auth/TwitchAuth/TwitchAuth';
import NotFound from '../../components/NotFound/NotFound';

import './AuthContainer.scss';

const AuthContainer = (props) => {
    const { match } = props;
    if(!!localStorage.token) return <Redirect to="/admin" />;
    return (
        <Fragment>
            <Head/>
            <Switch>
                <Route path={match.url} exact component={Login} />
                <Route path={`${match.url}/register`} exact component={Register} />
                <Route path={`${match.url}/password-recovery`} exact component={RecoveryEmail} />
                <Route path={`${match.url}/password-recovery/approve`} exact component={CodeConfirm} />
                <Route path={`${match.url}/password-recovery/set-new`} exact component={SetNewPassword} />
                <Route path={`${match.url}/facebook`} exact component={FBAuth} />
                <Route path={`${match.url}/facebook/approve`} exact component={CodeConfirm} />
                <Route path={`${match.url}/approve`} exact component={CodeConfirm} />
                <Route path={`${match.url}/twitch`} component={TwitchAuth} />
                <Route component={NotFound} />
            </Switch>
        </Fragment>
    );
};

export default AuthContainer;