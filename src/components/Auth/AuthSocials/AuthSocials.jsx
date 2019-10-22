import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { postLoginFacebook } from "../../../actions/authActions";

import TwitchIcon from '../../../assets/image/twitch.svg';
import FacebookIcon from '../../../assets/image/FB.svg';

import './AuthSocials.scss';

class AuthSocials extends Component {

    loginFacebook = ({accessToken}) => {
        const { postLoginFacebook, history } = this.props;
        let obj = {
            access_token: accessToken
        };
        postLoginFacebook(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                if(res.payload.data.token && res.payload.data.token !== null) {
                    localStorage.token = res.payload.data.token;
                    history.push('/admin');
                } else {
                    sessionStorage.security_token = res.payload.data.security_token;
                    history.push('/auth/facebook');
                }
            } else {
                console.error(res);
            }
        });
    };

    render() {
        let appId = '2318848598348518';
        return (
            <div className="auth_socials">
                <p>Or you can use socials</p>
                <FacebookLogin
                    appId={appId}
                    callback={this.loginFacebook}
                    render={({onClick}) => (
                        <IconButton
                            onClick={onClick}
                        >
                            <img src={FacebookIcon} alt="facebook"/>
                        </IconButton>
                    )}
                />
                <a
                    href={`https://id.twitch.tv/oauth2/authorize?client_id=88pydm8fpnevlb7dks1jmi5qknagl8&redirect_uri=http%3A%2F%2Fgaming-stars.4-com.pro%2Fauth%2Ftwitch&response_type=token&scope=user_read`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IconButton>
                        <img src={TwitchIcon} alt="twitch"/>
                    </IconButton>
                </a>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postLoginFacebook
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuthSocials);