import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import DialogComponent from '../../HelperComponents/DialogComponent/DialogComponent';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';

import ExitIcon from '../../../assets/image/exit_app.svg';

import './SettingsNav.scss';

class SettingsNav extends Component {
    state = {
        open: false
    };

    toggleDialog = () => {
        this.setState(({open}) => ({
            open: !open
        }));
    };

    logOut = () => {
        const { history } = this.props;
        localStorage.clear();
        history.push('/auth');
    };

    render(){
        const { open } = this.state;
        return (
            <nav className="settings_block settings_nav_wrapper">
                <NavLink
                    to="/admin/settings"
                    exact
                    activeClassName="active"
                >
                    Profile Settings
                </NavLink>
                <NavLink
                    to="/admin/settings/password"
                    activeClassName="active"
                >
                    Password Settings
                </NavLink>
                <NavLink
                    to="/admin/settings/application"
                    activeClassName="active"
                >
                    Application Settings
                </NavLink>
                <button
                    onClick={this.toggleDialog}
                >
                    Log out
                </button>
                <DialogComponent
                    open={open}
                    onClose={this.toggleDialog}
                >
                    <div className="logout_wrapper">
                        <h3>Warning!</h3>
                        <img src={ExitIcon} alt="exit icon"/>
                        <p>Are you sure you want to quit?</p>
                        <div className="logout_buttons">
                            <DefaultButton
                                type="red"
                                size="small"
                                onClick={this.logOut}
                            >
                                YES
                            </DefaultButton>
                            <DefaultButton
                                type="green"
                                size="small"
                                onClick={this.toggleDialog}
                            >
                                NO
                            </DefaultButton>
                        </div>
                    </div>
                </DialogComponent>
            </nav>
        );
    }
}

export default withRouter(SettingsNav);