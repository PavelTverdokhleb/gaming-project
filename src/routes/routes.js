import React from 'react';
import App from '../containers/App';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Container from '../containers/Container/Container';
import AuthContainer from '../containers/AuthContainer/AuthContainer';
import GetStartContainer from '../containers/GetStartContainer/GetStartContainer';
import NotFound from '../components/NotFound/NotFound';

export default (
    <App>
        <Switch>
            <Route path='/' exact render={() => !!localStorage.token ? <Redirect to="/admin"/> : <Redirect to="/auth"/>}/>
            <Route path='/auth' component={AuthContainer} />
            <Route path='/admin' component={Container} />
            <Route path='/get-started' component={GetStartContainer} />
            <Route component={NotFound}/>
        </Switch>
    </App>
)
