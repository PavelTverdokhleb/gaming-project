import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import DialogComponent from '../../../HelperComponents/DialogComponent/DialogComponent';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';

class LeaveGameBoard extends Component {
    state = {
        open: false
    };

    toggleDialog = () => {
        this.setState(({open}) => ({
            open: !open
        }));
    };

    cancelGame = () => {
        const { socket, history } = this.props;
        socket.send(JSON.stringify({
            "state": "waiting_for_start",
            "type": "cancel",
            "data": {}
        }));
        setTimeout(() => {
            history.push('/admin/game-center');
        }, 200);
    };

    render(){
        const { open } = this.state;
        return (
            <Fragment>
                <button
                    className="quit_lobby_btn"
                    onClick={this.toggleDialog}
                >
                    Quit Lobby
                </button>
                <DialogComponent
                    open={open}
                    onClose={this.toggleDialog}
                >
                    <div className="leave_lobby_block">
                        <div className="logout_wrapper">
                            <h3>Are you sure?</h3>
                            <div className="logout_buttons">
                                <DefaultButton
                                    type="red"
                                    size="small"
                                    onClick={this.cancelGame}
                                >
                                    YES
                                </DefaultButton>
                                <DefaultButton
                                    type="green"
                                    size="small"
                                    onClick={this.toggleDialog}
                                >
                                    NO
                                </DefaultButton>
                            </div>
                        </div>
                    </div>
                </DialogComponent>
            </Fragment>
        );
    }
}

export default withRouter(LeaveGameBoard);