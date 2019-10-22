import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import TransitionedBlock from '../../../HelperComponents/TransitionedBlock/TransitionedBlock';
import Preloader from '../../../HelperComponents/Preloader/Preloader';
import UserConnectedConsole from '../../../UserProfileDetail/UserConnectedConsole';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../../Buttons/AuthButton/AuthButton';
import NotificationExpired from '../../../AppBlocks/NotificationExpired/NotificationExpired';
import {getConsoleIconBig} from "../../../../helpers/functions";

import { getGameRematchRequest, postGameRematchRequestAccept, deleteGameRematchRequestCancel } from "../../../../actions/gameCenterActions";

class ApproveRematch extends Component {
    state = {
        notFound: false
    };

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.id !== this.props.match.params.id) {
            this.getData();
        }
    }

    getData = () => {
        const { match: {params}, getGameRematchRequest, history } = this.props;
        getGameRematchRequest(params.id).then(res => {
            if(res.error && res.error.response && res.error.response.status && res.error.response.status === 404) {
                this.setState({notFound: true});
            } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                if(res.error.response.data.detail[0] === 'invalid state') {
                    history.push('/admin/game-center');
                }
            }
        });
    };

    acceptOpponent = () => {
        const { postGameRematchRequestAccept, match: {params}, history } = this.props;
        postGameRematchRequestAccept(params.id).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                history.push('/admin/game-center/lobby');
            }
        });
    };

    cancelApprove = () => {
        const { deleteGameRematchRequestCancel, match: {params}, history } = this.props;
        deleteGameRematchRequestCancel(params.id).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 204) {
                history.push('/admin/game-center');
            }
        });
    };

    render(){
        const { game_center: {rematch_request} } = this.props;
        const { notFound } = this.state;

        if(notFound) return <NotificationExpired/>;
        else if(!rematch_request.bet) return <Preloader/>;
        const { opponent, game, ready, players_ready, platform, bet } = rematch_request;
        return (
            <TransitionedBlock>
                <div className="block_center">
                    <div className="approve_opponent_info block_approve_wrapper">
                        <div className="top_opponent_info">
                            <h4 className="opponent_block_title">Connect with your opponent</h4>
                            <Avatar
                                classes={{
                                    root: 'opponent_user_avatar'
                                }}
                                src={opponent.avatar}
                            />
                            <h5 className="opponent_username">{opponent.username}</h5>
                            <p className="opponent_games_played">{`${opponent.games_played} Games played`}</p>
                            <UserConnectedConsole platforms={[platform]}/>
                            <div className="opponent_need_add_friends">
                                <p>Add your opponent as a friend directly on your console. Then, click confirm to start the game</p>
                            </div>
                        </div>
                        <div className="bottom_opponent_info">
                            <div className="opponent_approve_block">
                                <DefaultButton
                                    type="green"
                                    onClick={this.acceptOpponent}
                                    disabled={ready}
                                >
                                    Confirm
                                </DefaultButton>
                                <span>{`Players ready: ${players_ready}/2`}</span>
                            </div>
                            <hr/>
                            <div className="opponent_cancel_block">
                                <AuthButton
                                    variant="outlined"
                                    onClick={this.cancelApprove}
                                >
                                    Cancel
                                </AuthButton>
                            </div>
                        </div>

                    </div>
                    <div className="approve_game_details block_approve_wrapper">
                        <h4 className="opponent_block_title">Details:</h4>
                        <div className="game_details_platform">
                            <p className="game_details_label">Platform</p>
                            {getConsoleIconBig(platform.name.toLowerCase())}
                            <p className="game_details_label">{platform.name}</p>
                        </div>
                        <hr/>
                        <div className="details_block_inner">
                            <p className="game_details_label">Game Stake</p>
                            <span className="game_details_stack">{bet} €</span>
                        </div>
                        <hr/>
                        <div className="details_block_inner details_game_logo">
                            <img src={game.vertical_logo} alt="game logo"/>
                            <p className="game_details_label">{game.name}</p>
                        </div>
                    </div>
                </div>
            </TransitionedBlock>
        );
    }
}

const mapStateToProps = ({game_center}) => {
    return{
        game_center
    }
};

const mapDispatchToProps = {
    getGameRematchRequest,
    postGameRematchRequestAccept,
    deleteGameRematchRequestCancel
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveRematch);