import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SwitchBar from '../../HelperComponents/SwitchBar/SwitchBar';
import AppCircle from '../../AppBlocks/AppCircle/AppCircle';

import { getPreferences, patchPreferences } from "../../../actions/userActions";

import './ApplicationSettings.scss';

class ApplicationSettings extends Component {
    componentDidMount() {
        const { getPreferences, user:{preferences} } = this.props;
        if(preferences.receive_push_notifications === undefined) {
            getPreferences();
        }
    }

    changeOption = name => event => {
        const { patchPreferences, user:{preferences} } = this.props;
        let obj = {
           [name]: !preferences[name]  
        };
        patchPreferences(obj).then(res => {
            console.log(res);
        });
    };

    render(){
        const {user:{preferences}} = this.props;
        // if(preferences.receive_push_notifications === undefined) return null;
        return (
            <div className="settings_content_block application_block">
                <AppCircle/>
                <div className="settings_form_wrapper">
                    <h3>App Preferences</h3>
                    <p>Set-up your best expirience</p>
                    <div className="application_settings_row">
                        <span className="application_setting_title">Receive Notifications</span>
                        <SwitchBar
                            value="receive_push_notifications"
                            checked={preferences.receive_push_notifications}
                            onChange={this.changeOption}
                        />
                    </div>
                    <div className="application_settings_row">
                        <span className="application_setting_title">Show profile in leaderboard</span>
                        <SwitchBar
                            value="show_in_leaderboard"
                            checked={preferences.show_in_leaderboard}
                            onChange={this.changeOption}
                        />
                    </div>
                    <div className="application_settings_row">
                        <span className="application_setting_title">Receive Special Offers</span>
                        <SwitchBar
                            value="receive_special_offers"
                            checked={preferences.receive_special_offers}
                            onChange={this.changeOption}
                        />
                    </div>
                    <div className="application_settings_row">
                        <span className="application_setting_title">Add Opponents to friends</span>
                        <SwitchBar
                            value="add_opponents_to_friends"
                            checked={preferences.add_opponents_to_friends}
                            onChange={this.changeOption}
                        />
                    </div>
                    <p className="deactivate_block">
                        To deactivate your profile please email us to <a href="mailto:info@gamingstars.com">info@gamingstars.com</a>
                    </p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPreferences,
        patchPreferences
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationSettings);