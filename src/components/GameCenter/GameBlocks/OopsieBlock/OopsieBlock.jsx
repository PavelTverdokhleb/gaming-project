import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import TransitionedBlock from '../../../HelperComponents/TransitionedBlock/TransitionedBlock';

import { postStartCreateGame } from "../../../../actions/gameCenterActions";
import { setGameData } from "../../../../actions/updateRedux";

import SwordIcon from '../../../../assets/image/oopsie_sword.svg';

import './OopsieBlock.scss';

class OopsieBlock extends Component {
    state = {
        loading: false
    };

    findNewOpponent = () => {
        const { postStartCreateGame, game_center: {search_data}, socket, setNewState, connectSocket, state, history, setGameData } = this.props;
        this.setState({loading: true});
        if(state === 'approving_opponent') {
            let obj = {
                ...search_data,
                type: 'vs_random'
            };
            postStartCreateGame(obj).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 201) {
                    if(socket.readyState === 3) {
                        connectSocket();
                        setNewState("looking_for_opponent");
                    } else {
                        history.push('/admin/game-center');
                    }
                } else {
                    this.setState({loading: false});
                }
            });
        } else {
            let obj = {
                ...search_data,
                type: 'vs_friend'
            };
            postStartCreateGame(obj).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 201) {
                    setGameData('friends', res.payload.data.friends);
                    history.push('/admin/game-center/select-friend');
                } else {
                    this.setState({loading: false});
                }
            });
        }
    };

    render(){
        const { state } = this.props;
        const { loading } = this.state;
        return (
            <TransitionedBlock>
                <div className="block_center">
                    <div className="content_center oopsie_block">
                        <div className="oopsie_wrapper">
                            <div className="title">Oopsie!</div>
                            <div className="block_img_center">
                                <img src={SwordIcon} alt="send icon"/>
                                <i></i>
                            </div>
                            {state === 'approving_opponent' ?
                                <div className="title title_info">One of the opponents <br/> did not accept the offer <br/> to participate in the <br/> game.</div>
                                :
                                <div className="title title_info">Sorry!<br/>Your friend did not<br/>accept the challenge.</div>
                            }
                        </div>
                        <div className="block_center_btn">
                            {state === 'waiting_for_rematch' ?
                                <Link
                                    to="/admin/game-center"
                                    className="oopsie_link"
                                >
                                    <DefaultButton
                                        type="green"
                                    >
                                        START NEW GAME
                                    </DefaultButton>
                                </Link>
                                :
                                <DefaultButton
                                    type="green"
                                    loading={loading}
                                    onClick={this.findNewOpponent}
                                >
                                    {state === 'approving_opponent' ?
                                        'FIND NEW OPPONENT'
                                        :
                                        'Challenge Another Friend'
                                    }
                                </DefaultButton>
                            }
                            <Link
                                to="/admin/game-center"
                            >
                                Cancel
                            </Link>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postStartCreateGame,
        setGameData
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OopsieBlock));