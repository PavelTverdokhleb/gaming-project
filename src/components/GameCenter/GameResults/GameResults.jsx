import React, {Component} from 'react';
import {connect} from 'react-redux';
import NextTimeBlock from '../GameBlocks/NextTimeBlock/NextTimeBlock';
import WinnerBlock from '../GameBlocks/WinnerBlock/WinnerBlock';
import DrawBlock from '../GameBlocks/DrawBlock/DrawBlock';

import { postStartCreateGame } from "../../../actions/gameCenterActions";

class GameResults extends Component {
    state = {
        error: null
    };

    rematch = () => {
        const { postStartCreateGame, history } = this.props;
        let obj = {
            type: "rematch"
        };
        postStartCreateGame(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                history.push('/admin/game-center/lobby');
            } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                if(res.error.response.data.detail && res.error.response.data.detail[0]) {
                    this.setState({error: res.error.response.data.detail[0]});
                }
            }
        });
    };

    getContent = (game) => {
        const { error } = this.state;
        switch (game.result) {
            case 'loss':
                return (
                    <NextTimeBlock
                        bet={game.bet}
                        friend_status={game.friend_status}
                        error={error}
                        rematch={this.rematch}
                    />
                );
            case 'win':
                return (
                    <WinnerBlock
                        bet={game.bet}
                        friend_status={game.friend_status}
                        error={error}
                        rematch={this.rematch}
                    />
                );
            case 'draw':
                return (
                    <DrawBlock
                        error={error}
                        friend_status={game.friend_status}
                        rematch={this.rematch}
                    />
                );
            default:
                return null;
        }
    };

    render(){
        const { game_result } = this.props.game_center;
        let content = this.getContent(game_result);
        return content;
    }
}

const mapStateToProps = (state) => {
    return{
        game_center: state.game_center
    }
};

const mapDispatchToProps = {
    postStartCreateGame
};

export default connect(mapStateToProps, mapDispatchToProps)(GameResults);