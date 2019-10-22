import React, {Component, Fragment} from 'react';
import DialogComponent from '../../../HelperComponents/DialogComponent/DialogComponent';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';

class FinishGameButton extends Component {
    state = {
        open: false
    };

    toggleDialog = () => {
        this.setState(({open}) => ({
            open: !open
        }));
    };

    finishGame = () => {
        const { socket } = this.props;
        this.setState({open: false});
        socket.send(JSON.stringify({
            "state": "in_game",
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
                    type="red"
                    disabled={ready}
                    onClick={this.toggleDialog}
                >
                    {ready
                        ? 'Waiting for your opponent'
                        : 'SUBMIT RESULTS'
                    }
                </DefaultButton>
                <DialogComponent
                    open={open}
                    onClose={this.toggleDialog}
                >
                    <div className="leave_lobby_block">
                        <div className="logout_wrapper">
                            <h3>Submit Results?</h3>
                            <p>You hereby confirm that the game has finished. Please report the results in the next step. If both opponents report different results, you will have to submit screenshots of the result page.</p>
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
                                    onClick={this.finishGame}
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

export default FinishGameButton;