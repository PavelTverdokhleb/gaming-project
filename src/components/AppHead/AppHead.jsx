import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import HeadNotifications from './HeadNotifications/HeadNotifications';
import DialogComponent from "../HelperComponents/DialogComponent/DialogComponent";
import DefaultButton from "../Buttons/DefaultButton/DefaultButton";

import ExitIcon from '../../assets/image/exit_app.svg';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import LogoImg from '../../assets/image/header_logo_img.png';
import LogoText from '../../assets/image/header_logo_text.svg';

import './AppHead.scss';


class AppHead extends Component {
    state = {
        anchorEl: null,
        openDialog: false
    };

    toggleDialog = () => {
        this.setState(({openDialog}) => ({
            openDialog: !openDialog
        }));
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    logOut = () => {
        const { history } = this.props;
        localStorage.clear();
        history.push('/auth');
    };

    render(){
        const { avatar, username } = this.props;
        const { anchorEl, openDialog } = this.state;
        const open = Boolean(anchorEl);
        return (
            <header className="app-header mui-fixed">
                <Link
                    to="/admin"
                    className="header-logo"
                >
                    <img src={LogoImg} alt="logo img"/>
                    <img src={LogoText} alt="logo text"/>
                </Link>
                <div className="header-options">
                    <Button
                        classes={{
                            root: `app-menu_button ${open ? 'menu_open' : null}`
                        }}
                        onClick={this.handleClick}
                    >
                        <p>{username}</p>
                        <Avatar
                            classes={{
                                root: 'user_avatar'
                            }}
                            src={avatar}
                        />
                        <ExpandIcon/>
                    </Button>
                    <HeadNotifications/>
                </div>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    classes={{
                        paper: 'app_head_popover'
                    }}
                >
                    <div className="app-menu">
                        <Link
                            to="/admin/profile"
                            onClick={this.handleClose}
                        >
                            My Profile
                        </Link>
                        <Link
                            to="/admin/settings"
                            onClick={this.handleClose}
                        >
                            Profile Settings
                        </Link>
                        <button
                            onClick={this.toggleDialog}
                        >
                            Log out
                        </button>
                    </div>
                </Popover>
                <DialogComponent
                    open={openDialog}
                    onClose={this.toggleDialog}
                >
                    <div className="logout_wrapper">
                        <h3>Warning!</h3>
                        <img src={ExitIcon} alt="exit icon"/>
                        <p>Are you sure you want to quit?</p>
                        <div className="logout_buttons">
                            <DefaultButton
                                type="red"
                                size="small"
                                onClick={this.logOut}
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
                </DialogComponent>
            </header>
        );
    }
}

export default AppHead;