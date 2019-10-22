import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import DialogComponent from '../../HelperComponents/DialogComponent/DialogComponent';
import IconButton from '@material-ui/core/IconButton';
import YouTubePlayer from 'react-player/lib/players/YouTube';

import PlayIcon from '../../../assets/image/play.svg';
import DialogClose from '../../../assets/image/dialog_close.svg';

class AuthPromo extends Component {
    state = {
        open: false
    };

    toggleDialog = () => {
        this.setState({open: !this.state.open})
    };

    render(){
        const { image, section } = this.props;
        const { open } = this.state;
        return (
            <section className="auth_promo_wrapper">
                <div className="auth_promo">
                    <div className="promo_image">
                        {image}
                        <IconButton
                            classes={{
                                root: `play_button ${section}_play_button`
                            }}
                            onClick={this.toggleDialog}
                        >
                            <img src={PlayIcon} alt="play icon"/>
                        </IconButton>
                    </div>
                    <p className="promo_text promo_text_bottom">Play video games for money or crypto against others</p>
                </div>
                <DialogComponent
                    open={open}
                    onClose={this.toggleDialog}
                >
                    <IconButton
                        onClick={this.toggleDialog}
                        classes={{
                            root: 'dialog_close_button'
                        }}
                    >
                        <img src={DialogClose} alt="dialog close icon"/>
                    </IconButton>
                    <YouTubePlayer
                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        playing
                        controls
                    />
                </DialogComponent>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return{
        //name: state.name,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //login
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPromo);