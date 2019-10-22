import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PopoverComponent from '../../HelperComponents/PopoverComponent/PopoverComponent';
import Badged from '../../HelperComponents/Badged/Badged';
import NotificationItem from './NotificationItem';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {API_SOCKET_BASE_URL} from "../../../config";

import { isArray } from "../../../helpers/functions";
import { setNotificationsList, getNotifications, clearNotifications, deleteNotification, patchNotificationsSections } from "../../../actions/notificationsActions";
import { setWalletData } from "../../../actions/updateRedux";

import NotificationIcon from '../../../assets/image/header_notifications.svg';

import './HeadNotifications.scss';

class HeadNotifications extends Component {
    state = {
        anchorEl: null,
        total: null
    };

    componentDidMount() {
        this.connectSocket();
    }

    componentWillUnmount() {
        this.socket.close();
        clearTimeout(this.reconnect);
    }

    connectSocket = () => {
        this.socket = new WebSocket(`wss://${API_SOCKET_BASE_URL}/ws/notification/?token=${localStorage.token}`);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    };

    onOpen = (e) => {
        console.log('Notification soccet connected', e);
    };

    onMessage = (e) => {
        const { setNotificationsList, setWalletData } = this.props;
        let data = JSON.parse(e.data);
        console.log(data);
        setNotificationsList(data.data);
        setWalletData("balance", {balance: data.data.balance});
        this.setState({total: data.data.total});

    };

    onClose = (e) => {
        console.error('Notification socket closed', e);
        if(!e.wasClean) {
            this.reconnect = setTimeout(() => this.connectSocket(), 5000);
        }
    };

    onError = (error) => {
        console.error("Notification socket error " + error);
    };

    handleClick = event => {
        const { getNotifications } = this.props;
        const { total } = this.state;
        this.setState({
            anchorEl: event.currentTarget,
        });
        getNotifications().then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200 && total !== 0) {
                this.update({total: 0});
            }
        });
    };

    handleClose = () => {
        const { clearNotifications } = this.props;
        this.setState({
            anchorEl: null,
        });
        setTimeout(() => clearNotifications(), 300);
    };

    closePopover = () => {
        this.setState({
            anchorEl: null,
        });
    };

    remove = (id) => {
        const { deleteNotification } = this.props;
        deleteNotification(id);
    };

    update = data => {
        const { patchNotificationsSections } = this.props;
        patchNotificationsSections(data).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                this.setState({total: 0});
            }
        });
    };

    render(){
        const { notifications: { notifications_list } } = this.props;
        const { anchorEl, total } = this.state;
        const active = Boolean(anchorEl);

        let noItems = false;
        if(notifications_list.important && notifications_list.other && !isArray(notifications_list.important) && !isArray(notifications_list.other)) {
            noItems = true;
        }

        return (
            <div className="head_btn_wrapper">
                <Badged content={total}>
                    <IconButton
                        onClick={this.handleClick}
                    >
                        <img src={NotificationIcon} alt="notification icon"/>
                    </IconButton>
                </Badged>
                <span className={active ? "head_btn_indicator indicator_active" : "head_btn_indicator"}></span>
                <PopoverComponent
                    anchor={anchorEl}
                    onClose={this.handleClose}
                >
                    <div className="head_notifications">
                        <ScrollBar
                            maxHeight="500px"
                        >
                            {!notifications_list.important || !notifications_list.other ?
                                <div className="notifications_loader">
                                    <CircularProgress/>
                                </div>
                                :
                                <Fragment>
                                    {
                                        isArray(notifications_list.important) ?
                                            <div className="important_notifications">
                                                <h6>IMPORTANT NOTIFICATIONS:</h6>
                                                {
                                                    notifications_list.important.map((item, i) => (
                                                        <NotificationItem
                                                            key={i}
                                                            {...item}
                                                            close={this.closePopover}
                                                            remove={this.remove}
                                                        />
                                                    ))
                                                }
                                            </div>
                                            : null
                                    }
                                    {
                                        isArray(notifications_list.other) ?
                                            <div className="other_notifications">
                                                <h6>OTHER:</h6>
                                                {
                                                    notifications_list.other.map((item, i) => (
                                                        <NotificationItem
                                                            key={i}
                                                            {...item}
                                                            close={this.closePopover}
                                                            remove={this.remove}
                                                        />
                                                    ))
                                                }
                                            </div>
                                            : null
                                    }
                                </Fragment>
                            }
                            {noItems ? <p className="no_notifications">You don't have notifications yet</p> : null}
                        </ScrollBar>
                    </div>
                </PopoverComponent>
            </div>
        );
    }
}

function mapStateToProps({notifications}) {
    return {
        notifications
    }
}

const mapDispatchToProps = {
    setNotificationsList,
    getNotifications,
    clearNotifications,
    deleteNotification,
    patchNotificationsSections,
    setWalletData
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadNotifications);