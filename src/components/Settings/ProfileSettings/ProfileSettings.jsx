import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import ChangeUsername from './ChangeUsername';

import { getMyProfile, patchMyProfile } from "../../../actions/userActions";

import './ProfileSettings.scss';

class ProfileSettings extends Component {
    state = {
        edit: false,
        message: null
    };

    componentDidMount() {
        const { getMyProfile, user:{user_info}  } = this.props;
        if(!user_info.email) {
            getMyProfile();
        }
    }

    changeEdit = () => {
        this.setState(({edit}) => ({
            edit: !edit
        }));
    };

    handleImageChange(e) {
        e.preventDefault();

        const { patchMyProfile } = this.props;

        let file = e.target.files[0];

        let size = Number(((file.size / 1024) / 1024).toFixed(2));

        if(size >= 3) {
            this.setState({message: 'The image should not exceed 3 MB'});
        } else {
            const formData = new FormData();
            formData.append('avatar', file);

            patchMyProfile(formData).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    this.setState({message: null});
                }
            });
        }
    }


    render(){
        const { user:{user_info} } = this.props;
        const { edit, message } = this.state;
        if(!user_info.email) return null;
        return (
            <div className="settings_content_block profile_block">
                <div className="profile_avatar_wrapper">
                    <Avatar
                        classes={{
                            root: 'profile_avatar'
                        }}
                        src={user_info.avatar}
                    />
                    <p className="profile_avatar_info">Upload new profile photo</p>

                    <input
                        id="avatarInput"
                        className="fileInput"
                        type="file"
                        onChange={(e)=>this.handleImageChange(e)}
                    />

                    <AuthButton
                        variant="outlined"
                        onClick={() => document.getElementById('avatarInput').click() }
                    >
                        upload
                    </AuthButton>
                    <p className="profile_avatar_message">{message}</p>
                </div>
                <div className="settings_profile_wrapper">
                    <h3>Your profile</h3>
                    <div className="flex-center-btw edit_username">
                        {edit ?
                            <ChangeUsername
                                onClose={this.changeEdit}
                                username={user_info.username}
                            />
                            :
                            <Fragment>
                                <div className="profile_settings_info">
                                    <span>Your Username</span>
                                    <p>{user_info.username}</p>
                                </div>
                                <AuthButton
                                    variant="outlined"
                                    onClick={this.changeEdit}
                                >
                                    Edit
                                </AuthButton>
                            </Fragment>
                        }
                    </div>
                    <div className="profile_settings_info">
                        <span>Your Email</span>
                        <p>{user_info.email}</p>
                    </div>
                    <AuthButton
                        variant="contained"
                        type="link"
                        to="/admin/settings/password"
                    >
                        Change My Password
                    </AuthButton>
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
        getMyProfile,
        patchMyProfile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);