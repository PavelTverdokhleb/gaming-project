import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import TransitionedBlock from '../../../HelperComponents/TransitionedBlock/TransitionedBlock';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../../Buttons/AuthButton/AuthButton';
import UserConnectedConsole from '../../../UserProfileDetail/UserConnectedConsole';
import OopsieBlock from '../OopsieBlock/OopsieBlock';

import { getConsoleIconBig } from "../../../../helpers/functions";
import { setGameData } from "../../../../actions/updateRedux";

import './ApproveOpponent.scss';

class ApproveOpponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: props.game_center.approving_opponent.ready || false,
            players: props.game_center.approving_opponent.players_ready || 0,
            cancel: false
        };
    }

    componentDidMount() {
        const { socket, setGameData, history } = this.props;
        socket.addEventListener('message', (e) => {
            let data = JSON.parse(e.data);
            console.log(data);
            if(data.type === 'i_left') {
                history.push('/admin/game-center');
                return
            }
            if(
                (data.state === "approving_opponent" && data.type === "opponent_leaves") ||
                (data.state === "approving_opponent" && data.type === "timeout") ||
                (data.state === "waiting_for_friend" && data.type === "opponent_leaves") ||
                (data.state === "waiting_for_friend" && data.type === "timeout") ||
                (data.state === "waiting_for_rematch" && data.type === "opponent_leaves") ||
                (data.state === "waiting_for_rematch" && data.type === "timeout")
            ) {
                setGameData("search_data", data.data);
                this.setState({cancel: true});
            } else if(
                (data.state === "approving_opponent" && data.type !== "opponent_leaves" && data.type !== "opponents_ready" && data.type !== "timeout") ||
                (data.state === "waiting_for_friend" && data.type !== "opponent_leaves" && data.type !== "opponents_ready" && data.type !== "timeout") ||
                (data.state === "waiting_for_rematch" && data.type !== "opponent_leaves" && data.type !== "opponents_ready" && data.type !== "timeout")
            ) {
                if(data.type === "opponent_accepts") {
                    this.setState({ready: data.data.me, players: 1});
                } else {
                    this.setState({ready: data.data.ready, players: data.data.players_ready});
                }
            }
        });
    }

    acceptOpponent = () => {
        const { socket } = this.props;
        socket.send(JSON.stringify({
            "state": "approving_opponent",
            "type": "proceed",
            "data": {}
        }));
    };

    cancelApprove = () => {
        const { socket, history, state } = this.props;
        console.log('Approve cancel with state', state);
        socket.send(JSON.stringify({
            "state": state,
            "type": "cancel",
            "data": {}
        }));
        setTimeout(() => {
            history.push('/admin/game-center');
        }, 200);
    };

    render(){
        const { game_center:{approving_opponent}, setNewState, connectSocket, socket, state } = this.props;
        const { ready, players, cancel } = this.state;
        if(cancel) return (
            <OopsieBlock
                state={state}
                socket={socket}
                setNewState={setNewState}
                connectSocket={connectSocket}
            />
        );
        else if(!approving_opponent.bet) return null;
        const { platform, opponent, game, bet } = approving_opponent;

        let acceptText = state === 'approving_opponent'
            ? 'Waiting for your opponent'
            : 'WAITING FOR FRIEND';

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
                                    {ready
                                        ? acceptText
                                        : 'Confirm'
                                    }
                                </DefaultButton>
                                <span>{`Players ready: ${players}/2`}</span>
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

function mapStateToProps(state) {
    return{
        game_center: state.game_center
    }
}

export default withRouter(connect(mapStateToProps, {setGameData})(ApproveOpponent));