import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { postLoginTwitch } from "../../../actions/authActions";

class TwitchAuth extends Component {
    state = {
        error: false
    };

    componentDidMount() {
        const { postLoginTwitch, location, history } = this.props;
        let params = new URLSearchParams(location.hash.substring(1));
        let data = {
            access_token: params.get("access_token")
        };
        postLoginTwitch(data).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                localStorage.token = res.payload.data.token;
                history.push('/admin');
            } else {
                this.setState({error: true});
            }
        })
    }

    render(){
        const { error } = this.state;
        if(error) {
            return (
                <main className="auth_container">
                    <section className="auth_center">
                        <p>
                            Something went wrong while login with twitch&nbsp;
                        </p>
                        <div>
                            <Link to="/auth">Go to login</Link>
                        </div>
                    </section>
                </main>
            );
        } else {
            return null;
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postLoginTwitch
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(TwitchAuth);