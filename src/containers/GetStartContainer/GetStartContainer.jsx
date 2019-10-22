import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Head from '../../components/Auth/Head/Head';
import StartConnectPlatform from '../../components/GetStart/StartConnectPlatform/StartConnectPlatform';
import GetCredits from '../../components/GetStart/GetCredits/GetCredits';
import NotFound from '../../components/NotFound/NotFound';
import Loader from "../../components/HelperComponents/Loader/Loader";

import { getIntro } from "../../actions/introActions";


class GetStartContainer extends Component {
    
    componentDidMount() {
        const { getIntro, intro:{ info }, history } = this.props;
        if(!info.hasOwnProperty('intro_step_1_completed') || !info.hasOwnProperty('intro_step_2_completed')) {
            getIntro().then(res => {
                if(res.error && res.error.response && res.error.response.status && res.error.response.status === 401) {
                    localStorage.clear();
                    history.push('/auth');
                }
            });
        }
    }
    
    render() {
        const { match, intro:{info} } = this.props;
        if(!localStorage.token) return <Redirect to="/auth" />;
        else if(!info.hasOwnProperty('intro_step_1_completed') || !info.hasOwnProperty('intro_step_2_completed')) return <Loader/>;
        else if(info.intro_step_1_completed && info.intro_step_2_completed) return <Redirect to="/admin" />;
        return (
            <main className="get_started_wrapper">
                <Head/>
                <Switch>
                    <Route path={match.url} exact component={StartConnectPlatform} />
                    <Route path={`${match.url}/credits`} component={GetCredits} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        intro: state.intro
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getIntro
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStartContainer);
