import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import SnackBar from '../../../HelperComponents/SnackBar/SnackBar';

import { setGameData } from "../../../../actions/updateRedux";

import CheckOff from '../../../../assets/image/game_checkbox_unchecked.svg';
import CheckOn from '../../../../assets/image/game_checkbox_checked.svg';
import GameOverIcon from '../../../../assets/image/game_over.svg';

import './GameOverBlock.scss';


class GameOverBlock extends Component {
    state = {
        checked: true,
        showInfo: false,
        ready: false,
        players: 0
    };

    componentDidMount() {
        const { socket, setGameData, history } = this.props;
        socket.addEventListener('message', (e) => {
            let data = JSON.parse(e.data);
            console.log(data);
            if(data.new_state === 'proving_result') {
                history.push('/admin/game-center/proving-result');
            } else {
                if(data.state === "submitting_result" && data.type !== "opponent_leaves" && data.type !== "opponents_ready") {
                    if(data.type === "opponent_accepts") {
                        this.setState({ready: data.data.me, players: 1});
                    } else {
                        this.setState({ready: data.data.ready, players: data.data.players_ready});
                    }
                }
                if(data.data.result) {
                    setGameData("game_result", data.data);
                    history.push('/admin/game-center/result');
                }
            }
        });
    }

    handleChange = event => {
        this.setState({ checked: event.target.checked });
    };

    closeInfo = () => {
        this.setState({showInfo: false});
    };

    submitResult = (result) => {
        const { socket } = this.props;
        const { checked } = this.state;
        if(checked) {
            socket.send(JSON.stringify({
                "state": "submitting_result",
                "type": "proceed",
                "data": {
                    "result": result
                }
            }));
        } else {
            this.setState({showInfo: true});
        }
    };

    render(){
        const { checked, showInfo, ready, players } = this.state;
        return (
            <div className="block_center">
                <div className="content_center game_over_block">
                    <div className="block_wrapper">
                        <div className="title">Game Over</div>
                        <div className="block_img_center">
                            <img src={GameOverIcon} alt="game over"/>
                            <i></i>
                        </div>
                    </div>
                    <div className="check_block">
                        <Checkbox
                            checked={checked}
                            onChange={this.handleChange}
                            value="checkedA"
                            checkedIcon={<img src={CheckOn} alt="check on"/>}
                            icon={<img src={CheckOff} alt="check off"/>}
                            classes={{
                                root: 'submitting_results_checkbox',
                                checked: 'submitting_results_checkbox_checked',
                            }}
                        />
                        <div className="text_check">I understand that my account will <br/> be permanently banned if I submit <br/> the wrong result after the game. </div>
                    </div>
                    <div className="block_center_btn">
                        <DefaultButton
                            type="green"
                            disabled={ready}
                            onClick={() => this.submitResult('win')}
                        >
                            I WON
                        </DefaultButton>
                        <DefaultButton
                            type="red"
                            disabled={ready}
                            onClick={() => this.submitResult('loss')}
                        >
                            I LOST
                        </DefaultButton>
                    </div>
                    <div className="game_info">
                        {ready ?
                            <p>Waiting for your opponent</p>
                            :
                            <button
                                onClick={() => this.submitResult('draw')}
                            >
                                Submit Draw
                            </button>
                        }
                        <span>{`Results submitted: ${players}/2`}</span>
                    </div>
                </div>
                <SnackBar
                    open={showInfo}
                    onClose={this.closeInfo}
                    classes="game_over_info"
                >
                    Confirm the conditions by clicking on the check mark field
                </SnackBar>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setGameData
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(GameOverBlock));