import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import YouTubePlayer from 'react-player/lib/players/YouTube';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import Preloader from "../../HelperComponents/Preloader/Preloader";
import TransitionedBlock from "../../HelperComponents/TransitionedBlock/TransitionedBlock";

import { getCreditsVideo, patchIntro } from "../../../actions/introActions";

import SkipLinkIcon from '../../../assets/image/skip_link.svg';
import PlayIcon from '../../../assets/image/play_icon.svg';
import PlayAgainIcon from '../../../assets/image/play_again_icon.svg';

import './GetCredits.scss';


class GetCredits extends Component {
    state = {
        played_time: null,
        playing: false,
        end: false,
        success: false
    };

    componentDidMount() {
        const { getCreditsVideo, intro:{ info, video } } = this.props;
        if(!video.youtube_link && info.hasOwnProperty('intro_step_2_completed')) {
            getCreditsVideo();
        }
    }

    ref = player => {
        this.player = player;
    };

    onProgress = (e) => {
        let duration = this.player.getDuration() - 1;
        this.setState({played_time: Math.floor(Math.ceil(duration) - Math.floor(e.playedSeconds))});
    };

    onStart = () => {
        this.setState({playing: true});
    };

    onEnded = () => {
        this.setState({end: true, playing: false, success: true});
        setTimeout(() => this.player.seekTo(0, 'seconds'),0);
    };

    startPlaying = () => {
        this.setState({playing: true, end: false});
    };

    nextStep = () => {
        const { patchIntro, history } = this.props;
        const { success } = this.state;
        let obj = {
            intro_step_2_reward_earned: success
        };
        patchIntro(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                history.push('/admin');
            }
        });
    };

    render(){
        const { intro:{ info, video } } = this.props;
        const { played_time, playing, end, success } = this.state;
        const stillPlay = played_time !== 0 && !success;
        const showButton = played_time !== null;
        const previewImage = "https://img5.goodfon.ru/wallpaper/nbig/b/f5/daimen-pape-by-daimen-pape-cyberpunk-2088-kiarakazumiofficia.jpg";
        if(!info.intro_step_1_completed) return <Redirect to="/get-started" />;
        else if(!video.youtube_link) return <Preloader/>;
        const preview = video.logo === null ? previewImage : video.logo;
        return (
            <TransitionedBlock>
                <div className="get_credits_wrapper get_start_box">
                    <h2 className="get_start_title">Watch this video to earn 5 Euro welcome bonus!</h2>
                    <div className="credits_player_wrapper">
                        {playing ?  <div className="player_preview"></div> : null}
                        <YouTubePlayer
                            url={video.youtube_link}
                            playing={playing}
                            ref={this.ref}
                            onStart={this.onStart}
                            onProgress={this.onProgress}
                            onEnded={this.onEnded}
                            progressInterval={500}
                            config={{
                                youtube: {
                                    playerVars: {
                                        showinfo: 0,
                                        cc_load_policy: 0,
                                        controls: 0,
                                        disablekb: 1,
                                        start: 1,
                                        iv_load_policy: 3,
                                        modestbranding: 1,
                                        rel: 0
                                    }
                                }
                            }}
                        />
                        {!playing || end ?
                            <div className="player_preview" style={{backgroundImage: `url("${preview}")`}}>
                                {showButton ?
                                    <button
                                        onClick={this.startPlaying}
                                        disabled={!showButton}
                                    >
                                        <img src={success ? PlayAgainIcon : PlayIcon} alt="play icon"/>
                                    </button>
                                    : null
                                }
                            </div>
                            : null
                        }
                    </div>
                    <p className="credits_info">
                        Please take the time to watch this video explaining all features of Gaming Stars and<br/>get 5 Euro with this onetime offer. Alternatively, you can simply skip this video to<br/>deposit money or crypto.
                    </p>
                    <div className="credits_btn_wrapper">
                        {showButton ?
                            <AuthButton
                                variant="contained"
                                disabled={stillPlay}
                                onClick={this.nextStep}
                            >
                                {stillPlay ? `${played_time} seconds left...` : 'get a credits'}
                            </AuthButton>
                            : null
                        }
                        {stillPlay ?
                            <button
                                className="credits_skip"
                                onClick={this.nextStep}
                            >
                                Skip To Deposit
                                <img src={SkipLinkIcon} alt="skip link"/>
                            </button>
                            : null
                        }
                    </div>
                </div>
            </TransitionedBlock>
        );
    }
}

function mapStateToProps(state) {
    return{
        intro: state.intro
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCreditsVideo,
        patchIntro
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GetCredits);