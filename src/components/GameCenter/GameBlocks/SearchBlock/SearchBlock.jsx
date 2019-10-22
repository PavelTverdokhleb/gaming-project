import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../../Buttons/AuthButton/AuthButton';
import TransitionedBlock from '../../../HelperComponents/TransitionedBlock/TransitionedBlock';

import { postStartCreateGame } from "../../../../actions/gameCenterActions";
import { setGameData } from "../../../../actions/updateRedux";

import SearchIcon from '../../../../assets/image/search_opponent.svg';

import './SearchBlock.scss';

class SearchBlock extends Component {
    state = {
        searching: true,
        loading: false
    };

    componentDidMount() {
        const { socket, setGameData, history } = this.props;
        socket.addEventListener('message', (e) => {
            let data = JSON.parse(e.data);
            if(data.type === 'i_left') {
                history.push('/admin/game-center');
                return
            }
            if(data.state === 'looking_for_opponent' && data.type === 'timeout') {
                setGameData("search_data", data.data);
                this.setState({searching: false});
            }
        });
    }

    cancelSearch = () => {
        const { socket, history } = this.props;
        if(socket.readyState === 3) {
            history.push('/admin/game-center');
        } else {
            socket.send(JSON.stringify({
                "state": "looking_for_opponent",
                "type": "cancel",
                "data": {}
            }));
            history.push('/admin/game-center');
        }
    };

    findNewOpponent = () => {
        const { postStartCreateGame, game_center: {search_data}, connectSocket }  = this.props;
        this.setState({loading: true});
        postStartCreateGame({...search_data, type: 'vs_random'}).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                connectSocket();
                this.setState({searching: true})
            } else {
                this.setState({loading: false});
            }
        });
    };

    render(){
        const { searching, loading } = this.state;
        return (
            <TransitionedBlock>
                <div className="block_center">
                    <div className="content_center wait_block">
                        <div className="block_img_center">
                            <img src={SearchIcon} className={searching ? "search_anim" : ""} alt="send icon"/>
                            <i></i>
                        </div>
                        {searching ?
                            <Fragment>
                                <div className="title">Please wait!</div>
                                <div className="info_descriptions description_pad_bottom">We are trying to pick you the right opponent,<br/>wait up to 3-5 minutes</div>
                            </Fragment>
                            :
                            <Fragment>
                                <div className="title">Sorry</div>
                                <div className="info_descriptions">We could not find you the right<br/>opponent</div>
                                <DefaultButton
                                    type="green"
                                    loading={loading}
                                    onClick={this.findNewOpponent}
                                >
                                    RETRY
                                </DefaultButton>
                            </Fragment>
                        }
                        <AuthButton
                            variant="outlined"
                            onClick={this.cancelSearch}
                        >
                            CANCEL SEARCH
                        </AuthButton>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBlock));