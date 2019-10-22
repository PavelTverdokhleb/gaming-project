import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {connect} from 'react-redux';
import Badge from '@material-ui/core/Badge';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import RenderField from "../../HelperComponents/RenderField/RenderField";

import { getLogoConsole } from "../../../helpers/functions";

import ConnectedSuccess from '../../../assets/image/connected_success.svg';
import ConnectedFailed from '../../../assets/image/connected_failed.svg';

import './GameProfile.scss';


class GameProfile extends Component {
    state = {
        edit: false
    };

    getStatusImg(status) {
        if(status) {
            return <img src={ConnectedSuccess} alt="connected success"/>
        } else {
            return <img src={ConnectedFailed} alt="connected failed"/>
        }
    }

    editProfile = () => {
        this.setState(({edit}) => ({
            edit: !edit
        }));
    };

    submitForm = data => {
        const { patchPlatform, updatePlatform, id, profile_id } = this.props;
        if(profile_id !== data.profile_id) {
            return patchPlatform(id, data).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    updatePlatform(id, res.payload.data);
                    this.setState(({edit}) => ({
                        edit: !edit

                    }));
                }
                else {
                    throw new SubmissionError({...res.error.response.data});
                }
            });
        } else {
            this.setState(({edit}) => ({
                edit: !edit
            }));
        }
    };

    render(){
        const { handleSubmit, name, profile_id, profile_link, change } = this.props;
        const { edit } = this.state;
        const platform = name.toLowerCase();
        const logo = getLogoConsole(platform);
        const active = profile_id !== null;
        const status = active ? 'Profile connected' : 'Not connected';
        return (
            <section className={`game_profile_box ${platform}_profile`}>
                {active && <span className={`active_profile active_${platform}_profile`}></span>}
                <div className="game_profile_header">
                    <div>
                        <Badge
                            badgeContent={this.getStatusImg(active)}
                            classes={{
                                badge: 'badge_game_profile'
                            }}
                        >
                            {logo}
                        </Badge>
                    </div>
                    <div className="game_profile_title">
                        <p>{name}</p>
                        <span>{status}</span>
                    </div>
                </div>
                <div>
                    {edit ?
                        <form
                            className="game_profile_content"
                            onSubmit={handleSubmit(this.submitForm)}
                        >
                            <Field name="profile_id" component={RenderField} label={`Your ${name} gametag`} change={change} />
                            <AuthButton
                                variant="outlined"
                                formAction
                            >
                                Save
                            </AuthButton>
                        </form>
                        :
                        <div className="game_profile_content">
                            <div className="game_profile_info">
                                <span>Your Profile ID</span>
                                <p>
                                    {profile_id !== null
                                        ? profile_id
                                        : '-'
                                    }
                                </p>
                            </div>
                            <AuthButton
                                variant="outlined"
                                onClick={this.editProfile}
                            >
                                Edit
                            </AuthButton>
                        </div>
                    }
                </div>
                {active &&
                <div className="game_profile_link">
                    <a href={profile_link} target="_blank" rel="noopener noreferrer">
                        {profile_link}
                    </a>
                </div>
                }
            </section>
        );
    }
}

GameProfile = reduxForm({
    enableReinitialize: true
})(GameProfile);

function mapStateToProps(state, props) {
    return{
        initialValues: {
            profile_id: props.profile_id
        }
    }
}

export default connect(mapStateToProps, null)(GameProfile);