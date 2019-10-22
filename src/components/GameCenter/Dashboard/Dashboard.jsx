import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';
import Slider from "react-slick";
import SetStake from '../SetStake/SetStake';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import SelectConsole from '../../HelperComponents/SelectConsole/SelectConsole';
import PopperInfo from '../../HelperComponents/PopperInfo/PopperInfo';
import { Spring } from 'react-spring/renderprops';

import { isArray, getSelectPlatformIcon } from "../../../helpers/functions";
import { setGameData } from "../../../actions/updateRedux";
import { getUsersOnline, getCenterInfo, postStartCreateGame, postStartFrindGame } from "../../../actions/gameCenterActions";

import SliderArrowLeft from '../../../assets/image/slider_arrow_left.svg';
import SliderArrowRight from '../../../assets/image/slider_arrow_right.svg';

import './Dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const { search } = props.location;
        this.friendId = Number(new URLSearchParams(search.substring(1)).get('friend'));
        this.state = {
            currentIndex: 0,
            platform: null,
            anchorEl: null,
            open: false,
            message: null,
            stake: 5
        };
    }


    componentDidMount() {
        const { game_center:{center_info:{platforms, games}}, getUsersOnline } = this.props;
        if(isArray(games)) {
            let platform = this.getCurrentValue(platforms, games, 0);
            this.setState({platform});
        } else {
            this.getData();
        }
        getUsersOnline();
    }

    componentWillUnmount() {
        this.props.game_center.center_info.games = [];
    }

    getData = () => {
        const { getCenterInfo, history, setGameData } = this.props;
        getCenterInfo().then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                const { data, data:{platforms, games} } = res.payload;
                if(data.state && data.state === 'inviting_friend') {
                    setGameData('friend', data.friend);
                    history.push('/admin/game-center/invite-friend');
                } else if(data.state && data.state === 'selecting_friend') {
                    setGameData('friends', data.friends);
                    history.push('/admin/game-center/select-friend');
                } else if(data.state && data.state === 'proving_result') {
                    history.push('/admin/game-center/proving-result');
                } else if(data.state && data.state !== 'initial') {
                    history.push('/admin/game-center/lobby');
                } else {
                    let platform = this.getCurrentValue(platforms, games, 0);
                    this.setState({platform});
                }
            }
        });
    };

    changePlatform = (platform) => this.setState({platform});

    getCurrentValue = (platforms, games, index) => {
        return platforms
            .map(el => ({
                value: el.id,
                label: <p className="my_label">{getSelectPlatformIcon(el.name.toLowerCase())}<span>({el.profile_id !== null ? el.profile_id : 'Not connected'})</span></p>,
                profile: el.profile_id
            }))
            .filter(item => item.value === games[index].platforms[0])[0];
    };

    beforeChange = (oldIndex, newIndex) => {
        const { center_info: { games, platforms } } = this.props.game_center;
        let platform = this.getCurrentValue(platforms, games, newIndex);
        this.setState({
            currentIndex: newIndex,
            platform
        });
    };

    clickAway = () => {
        this.setState(({open}) => ({
            anchorEl: null,
            open: !open
        }));
    };

    increaseStake = () => {
        this.setState(({stake}) => {
            let newStake = stake + 5;
            return {
                stake: newStake > 25 ? 25 : newStake
            };
        })
    };

    decreaseStake = () => {
        this.setState(({stake}) => {
            let newStake = stake - 5;
            return {
                stake: newStake < 5 ? 5 : newStake
            }
        });
    };

    createGame = (type) => {
        const { postStartCreateGame, game_center:{center_info:{ games }}, history, setGameData } = this.props;
        const { platform, stake, currentIndex } = this.state;
        let selectConsole = document.getElementById('select_console_game');
        let selectStake = document.getElementById('select_stake_game');

        if(platform.profile === null) {
            this.setState(({open}) => ({
                anchorEl: selectConsole,
                open: !open,
                message: 'To play this game, connect your platform in Gaming Stars profile'
            }));
        } else {
            let obj = {
                game: games[currentIndex].id,
                platform: platform.value,
                bet: stake,
                type
            };
            if(type === 'vs_friend') {
                postStartCreateGame(obj).then(res => {
                    if(res.payload && res.payload.status && res.payload.status === 201) {
                        setGameData('friends', res.payload.data.friends);
                        history.push('/admin/game-center/select-friend');
                    } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                        if(res.error.response.data.detail && res.error.response.data.detail[0] === 'user already in lobby') {
                            this.getData();
                        } else if (res.error.response.data.detail && res.error.response.data.detail[0] === 'Your balance is low') {
                            this.setState(({open}) => ({
                                anchorEl: selectStake,
                                open: !open,
                                message: 'You don\'t have credits enough to play this game. Please, make a deposit to play'
                            }));
                        }
                    }
                });
            } else {
                postStartCreateGame(obj).then(res => {
                    if(res.payload && res.payload.status && res.payload.status === 201) {
                        history.push('/admin/game-center/lobby');
                    } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                        if(res.error.response.data.detail && res.error.response.data.detail[0] === 'user already in lobby') {
                            this.getData();
                        } else if (res.error.response.data.detail && res.error.response.data.detail[0] === 'Your balance is low') {
                            this.setState(({open}) => ({
                                anchorEl: selectStake,
                                open: !open,
                                message: 'You don\'t have credits enough to play this game. Please, make a deposit to play'
                            }));
                        }
                    }
                });
            }
        }
    };

    createFriendGame = () => {
        const { postStartFrindGame, game_center:{center_info:{ games }}, history } = this.props;
        const { platform, stake, currentIndex } = this.state;
        let selectStake = document.getElementById('select_stake_game');
        let challengeEl = document.getElementsByClassName('default_button_green')[0];
        let obj = {
            game: games[currentIndex].id,
            platform: platform.value,
            bet: stake,
            friend: this.friendId
        };
        postStartFrindGame(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                history.push('/admin/game-center/lobby');
            } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                if(res.error.response.data.detail && res.error.response.data.detail[0] === 'user already in lobby') {
                    this.getData();
                } else if (res.error.response.data.detail && res.error.response.data.detail[0] === 'Your balance is low') {
                    this.setState(({open}) => ({
                        anchorEl: selectStake,
                        open: !open,
                        message: 'You don\'t have credits enough to play this game. Please, make a deposit to play'
                    }));
                } else if (res.error.response.data.friend && res.error.response.data.friend.detail && res.error.response.data.friend.detail === 'user already in lobby') {
                    this.setState(({open}) => ({
                        anchorEl: challengeEl,
                        open: !open,
                        message: 'Friend already in lobby'
                    }));
                }
            }
        })
    };

    render(){
        const { game_center: {center_info: { games, platforms, plaform_fee }, users_online } } = this.props;
        const { currentIndex, platform, message, stake } = this.state;

        const { anchorEl, open } = this.state;
        const id = open ? 'simple-popper' : null;

        const settings = {
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '26%',
            beforeChange: this.beforeChange,
            arrows: false,
            dotsClass: 'slider_dots',
            appendDots: (dots) => (
                <div>
                    <IconButton
                        classes={{
                            root: "btn_nav"
                        }}
                        onClick={() => this.slider.slickPrev()}
                    >
                        <img src={SliderArrowLeft} alt="arrow left"/>
                    </IconButton>
                    <ul>{dots}</ul>
                    <IconButton
                        classes={{
                            root: "btn_nav"
                        }}
                        onClick={() => this.slider.slickNext()}
                    >
                        <img src={SliderArrowRight} alt="arrow right"/>
                    </IconButton>
                </div>
            )
        };
        if(!isArray(games)) return <Preloader/>;
        return (
            <TransitionedBlock>
                <section className="dashboard_wrapper">
                    <h2 className="block_header">Select your game</h2>
                    <div className="slider_wrapper">
                        <Slider
                            {...settings}
                            ref={slider => this.slider = slider}
                        >
                            {games.map(({id, logo}) => (
                                <div className="custom_slide" key={id}>
                                    <img src={logo} alt="game preview"/>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="dashboard_content_wrapper">
                        <div className="dashboard_block connected_profile">
                            <p>Your Platform:</p>
                            <SelectConsole
                                currentGame={games[currentIndex]}
                                data={platforms}
                                value={platform}
                                onChange={this.changePlatform}
                            />
                        </div>
                        <SetStake
                            stake={stake}
                            fee={plaform_fee}
                            onIncrease={this.increaseStake}
                            onDecrease={this.decreaseStake}
                        />
                        {this.friendId && !isNaN(this.friendId) ?
                            <div className="dashboard_challenge_start">
                                <DefaultButton
                                    type="green"
                                    onClick={this.createFriendGame}
                                >
                                    Start Challenge
                                </DefaultButton>
                            </div>
                            :
                            <div className="play_againts_wrapper">
                                <p>PLAY AGAINST:</p>
                                <div className="opponent_buttons_wrapper">
                                    <DefaultButton
                                        type="green"
                                        onClick={() => this.createGame('vs_friend')}
                                    >
                                        Friends
                                    </DefaultButton>
                                    <span>Or</span>
                                    <DefaultButton
                                        type="red"
                                        onClick={() => this.createGame('vs_random')}
                                    >
                                        Random Opponent
                                    </DefaultButton>
                                </div>
                            </div>
                        }
                        <div className="users_info_wrapper">
                            <div className="users_info">
                                <span></span>
                                <Spring
                                    from={{ count: 0 }}
                                    to={{ count: users_online !== null ? users_online : 0 }}>
                                    {props => <p>{`Online users: ${Math.floor(props.count)}`}</p>}
                                </Spring>
                            </div>
                        </div>
                    </div>
                    <PopperInfo
                        classes={this.friendId && !isNaN(this.friendId) ? 'challenge_popper' : ''}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        clickAway={this.clickAway}
                    >
                        {message}
                    </PopperInfo>
                </section>
            </TransitionedBlock>
        );
    }
}

function mapStateToProps(state) {
    return{
        game_center: state.game_center
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCenterInfo,
        postStartCreateGame,
        setGameData,
        getUsersOnline,
        postStartFrindGame
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);