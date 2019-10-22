import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import DialogComponent from '../../../HelperComponents/DialogComponent/DialogComponent';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import TransitionedBlock from '../../../HelperComponents/TransitionedBlock/TransitionedBlock';
import GameBoardInfo from './GameBoardInfo';
import Ticker from '../../Ticker/Ticker';
import LeaveGameBoard from './LeaveGameBoard';
import StartGameButton from './StartGameButton';
import FinishGameButton from './FinishGameButton';
import GameOverBlock from '../GameOverBlock/GameOverBlock';
import ChatPage from '../../../ChatPage/ChatPage';

import { setGameData } from "../../../../actions/updateRedux";

import GameLogo from '../../../../assets/image/game_logo.svg';

import './GameBoard.scss';


class GameBoard extends Component {
    state = {
        ready: false,
        players: 0,
        openLeaveDialog: false,
        dialogType: null
    };

    componentDidMount() {
        const { socket }  = this.props;
        socket.addEventListener('message', (e) => {
            let data = JSON.parse(e.data);
            console.log(data);

            if(data.state === "waiting_for_start" && data.type === "opponent_leaves") {
                this.setState({openLeaveDialog: true, dialogType: 'opponent_leaves'});
                return
            } else if(data.state === "waiting_for_start" && data.type === "timeout") {
                this.setState({openLeaveDialog: true, dialogType: 'timeout_wait'});
                return
            } else if(data.state === "in_game" && data.type === "opponent_doesnt_respond") {
                this.setState({openLeaveDialog: true, dialogType: 'timeout_game'});
                return
            }

            if(data.state === "waiting_for_start" && data.type === "opponents_ready" && data.new_state === "in_game") {
                this.setState({ready: false, players: 0});
            } else {
                if((data.state === "waiting_for_start" && data.type !== "opponent_leaves" && data.type !== "opponents_ready" ) ||
                    (data.state === "in_game" && data.type !== "opponent_leaves" && data.type !== "opponents_ready")) {
                    if(data.type === "opponent_accepts") {
                        this.setState({ready: data.data.me, players: 1});
                    } else {
                        this.setState({ready: data.data.ready, players: data.data.players_ready});
                    }
                }
            }
        });
    }

    closeLobby = () => {
        const { history, setNewState } = this.props;
        const { dialogType } = this.state;
        if(dialogType === 'opponent_leaves' || dialogType === 'timeout_wait') {
            history.push('/admin/game-center');
        } else {
            this.setState({openLeaveDialog: false});
            setNewState('submitting_result');
        }
    };

    getContentDialog = () => {
        const { dialogType, ready } = this.state;
        switch (dialogType) {
            case 'opponent_leaves':
                return (
                    <div className="logout_wrapper">
                        <h3>Your Opponent quit</h3>
                        <div className="logout_buttons">
                            <DefaultButton
                                type="red"
                                size="big"
                                onClick={this.closeLobby}
                            >
                                Leave this lobbie
                            </DefaultButton>
                        </div>
                    </div>
                );
            case 'timeout_wait':
                return (
                    <div className="logout_wrapper">
                        <h3>{ready ? 'Your Opponent doesn\'t respond' : 'You didn\'t respond'}</h3>
                        <div className="logout_buttons">
                            <DefaultButton
                                type="green"
                                size="big"
                                onClick={this.closeLobby}
                            >
                                Select new game
                            </DefaultButton>
                        </div>
                    </div>
                );
            case 'timeout_game':
                return (
                    <div className="logout_wrapper">
                        <h3>{ready ? 'Your opponent doesn\'t respond in 10 minutes' : 'You didn\'t respond in 10 minutes'}</h3>
                        <div className="logout_buttons">
                            <DefaultButton
                                type="green"
                                size="big"
                                onClick={this.closeLobby}
                            >
                                Go to Results
                            </DefaultButton>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    render(){
        const { game_center:{ waiting_for_start }, socket, state } = this.props;
        const { players, ready, openLeaveDialog } = this.state;

        let inGame = state === 'in_game';
        let submitResults = state === 'submitting_result';

        if((!submitResults && !waiting_for_start) || (!submitResults && !waiting_for_start.opponent)) return null;
        return (
            <TransitionedBlock>
                <div className="game_board_wrapper">
                    {!submitResults ?
                        <div>
                            <GameBoardInfo {...waiting_for_start}/>
                            <div className="game_board_start_block">
                                <img src={GameLogo} alt="game logo"/>
                                {inGame ?
                                    <FinishGameButton
                                        ready={ready}
                                        socket={socket}
                                    />
                                    :
                                    <StartGameButton
                                        ready={ready}
                                        socket={socket}
                                    />
                                }
                                <span>{`Players ready: ${players}/2`}</span>
                                {inGame ?
                                    <div className="game_board_start_info"></div>
                                    :
                                    <div className="game_board_start_info">
                                        <p>
                                            Please click on Quit Lobby if your opponent did not show up for the<br/>match or did not send you a friend invitation.
                                        </p>
                                        <LeaveGameBoard
                                            socket={socket}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <GameOverBlock
                            socket={socket}
                        />
                    }
                    <div>
                        <Ticker
                            submitResults={submitResults}
                            inGame={inGame}
                            started={waiting_for_start.started}
                            ended={waiting_for_start.ended}
                        />
                        <div className="game_board_chat">
                            <ChatPage
                                lobby
                                maxHeight="441px"
                            />
                        </div>
                    </div>
                    <DialogComponent
                        open={openLeaveDialog}
                        onClose={this.closeLobby}
                    >
                        <div className="leave_lobby_block">
                            {this.getContentDialog()}
                        </div>
                    </DialogComponent>
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

export default withRouter(connect(mapStateToProps, {setGameData})(GameBoard));