import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import GameProfile from '../../Profile/GameProfile/GameProfile';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import Preloader from "../../HelperComponents/Preloader/Preloader";
import TransitionedBlock from "../../HelperComponents/TransitionedBlock/TransitionedBlock";

import { isArray } from "../../../helpers/functions";
import { getIntroPlatforms, patchIntroPlatform, patchIntro } from "../../../actions/introActions";
import { updateIntroPlatform } from "../../../actions/updateRedux";

import './StartConnectPlatform.scss';


class StartConnectPlatform extends Component {

    componentDidMount() {
        const { getIntroPlatforms, intro:{ platforms } } = this.props;
        if(!isArray(platforms)) {
            getIntroPlatforms();
        }
    }

    nextStep = () => {
        const { patchIntro, history } = this.props;
        let obj = {
            intro_step_1_completed: true
        };
        patchIntro(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                history.push('/get-started/credits');
            }
        });
    };

    render() {
        const { intro:{ info, platforms }, patchIntroPlatform, updateIntroPlatform } = this.props;
        if(info.intro_step_1_completed) return <Redirect to="/get-started/credits" />;
        else if(!isArray(platforms)) return <Preloader/>;
        return (
            <TransitionedBlock>
                <div className="get_start_box start_consoles_wrapper">
                    <h2 className="get_start_title">
                        Connect your Platform
                    </h2>
                    <p className="consoles_links">
                        Provide your correct username on platform (
                        <a href="https://my.playstation.com" target="_blank" rel="noopener noreferrer">PSN ID,</a>&nbsp;
                        <a href="https://account.xbox.com" target="_blank" rel="noopener noreferrer">XBOX GAME TAG,</a>&nbsp;
                        <a href="https://steamcommunity.com" target="_blank" rel="noopener noreferrer">STEAM LOGIN</a>
                        ), so players can find you and play together
                    </p>
                    <div className="game_profiles_wrapper">
                        {platforms.map((item) => (
                            <GameProfile
                                key={item.id}
                                form={`${item.name}ProfileForm`}
                                patchPlatform={patchIntroPlatform}
                                updatePlatform={updateIntroPlatform}
                                {...item}
                            />
                        ))}
                    </div>
                    <p className="consoles_info">
                        We do not use your private information, we only need your username. You can connect your profiles later
                    </p>
                    <AuthButton
                        variant="contained"
                        onClick={this.nextStep}
                    >
                        Continue
                    </AuthButton>
                </div>
            </TransitionedBlock>
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
        getIntroPlatforms,
        patchIntroPlatform,
        updateIntroPlatform,
        patchIntro
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartConnectPlatform);