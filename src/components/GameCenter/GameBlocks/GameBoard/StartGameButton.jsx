import React, {Component, Fragment} from 'react';
import DialogComponent from '../../../HelperComponents/DialogComponent/DialogComponent';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';

class StartGameButton extends Component {
    state = {
        open: false
    };

    toggleDialog = () => {
        this.setState(({open}) => ({
            open: !open
        }));
    };

    acceptOpponent = () => {
        const { socket } = this.props;
        this.setState({open: false});
        socket.send(JSON.stringify({
            "state": "waiting_for_start",
            "type": "proceed",
            "data": {}
        }));
    };

    render(){
        const { ready } = this.props;
        const { open } = this.state;
        return (
            <Fragment>
                <DefaultButton
                    type="green"
                    disabled={ready}
                    onClick={this.toggleDialog}
                >
                    {ready
                        ? 'Waiting for your opponent'
                        : 'START GAME'
                    }
                </DefaultButton>
                <DialogComponent
                    open={open}
                    onClose={this.toggleDialog}
                >
                    <div className="leave_lobby_block">
                        <div className="logout_wrapper">
                            <h3>Start The Game?</h3>
                            <p>You hereby confirm that you have added your opponent as a friend and opened a game lobby on the console. Play the game on your console after you have confirmed.</p>
                            <div className="logout_buttons">
                                <DefaultButton
                                    type="red"
                                    size="small"
                                    onClick={this.toggleDialog}
                                >
                                    NO
                                </DefaultButton>
                                <DefaultButton
                                    type="green"
                                    size="small"
                                    onClick={this.acceptOpponent}
                                >
                                    YES
                                </DefaultButton>
                            </div>
                        </div>
                    </div>
                </DialogComponent>
            </Fragment>
        );
    }
}

export default StartGameButton;