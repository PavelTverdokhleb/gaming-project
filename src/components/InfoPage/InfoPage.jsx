import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import NotFound from "../NotFound/NotFound";
import InfoNav from './InfoNav/InfoNav';
import Faq from './Faq/Faq';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './TermsConditions/TermsConditions';
import Rules from './Rules/Rules';
import Support from './Support/Support';

import './InfoPage.scss';

class InfoPage extends Component {
    render(){
        const { match } = this.props;
        return (
            <div className="settings_wrapper blocks_row_wrapper">
                <InfoNav/>
                <section className="settings_block">
                    <Switch>
                        <Route path={match.url} exact component={Faq} />
                        <Route path={`${match.url}/privacy-policy`} exact component={PrivacyPolicy} />
                        <Route path={`${match.url}/terms-conditions`} exact component={TermsConditions} />
                        <Route path={`${match.url}/game-rules`} exact component={Rules} />
                        <Route path={`${match.url}/support`} exact component={Support} />
                        <Route component={NotFound} />
                    </Switch>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        //name: state.name
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //login
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);