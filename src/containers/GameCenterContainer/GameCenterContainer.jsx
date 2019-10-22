import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import GameResults from '../../components/GameCenter/GameResults/GameResults';
import GameCenterDashboard from '../../components/GameCenter/Dashboard/Dashboard';
import GameLobby from '../../components/GameCenter/GameLobby/GameLobby';
import UploadResults from '../../components/GameCenter/GameBlocks/UploadResults/UploadResults';
import SelectFriend from '../../components/GameCenter/GameBlocks/SelectFriend/SelectFriend';
import InviteFriend from '../../components/GameCenter/GameBlocks/InviteFriend/InviteFriend';
import NotFound from '../../components/NotFound/NotFound';
import Preloader from '../../components/HelperComponents/Preloader/Preloader';

import { setGameData } from "../../actions/updateRedux";
import { getCenterInfo } from "../../actions/gameCenterActions";
import { patchNotificationsSections } from "../../actions/notificationsActions";

class GameCenterContainer extends Component {

    componentDidMount() {
        const { getCenterInfo, history, location, setGameData } = this.props;

        if(location.pathname !== '/admin/game-center') {
            history.push('/admin/game-center');
        }
        getCenterInfo().then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                const { data } = res.payload;
                if(data.state && data.state === 'inviting_friend') {
                    setGameData('friend', data.friend);
                    history.push('/admin/game-center/invite-friend');
                } else if(data.state && data.state === 'selecting_friend') {
                    setGameData('friends', data.friends);
                    history.push('/admin/game-center/select-friend');
                } else if(data.state && data.state === 'proving_result') {
                    history.push('/admin/game-center/proving-result');
                } else if(data.state && data.state !== 'initial') {
                    history.push('/admin/game-center/lobby');
                } else {
                    if(location.pathname !== '/admin/game-center') {
                        history.push('/admin/game-center');
                    }
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const { notifications:{ notifications_sections } } = nextProps;
        if(notifications_sections && notifications_sections.game_center && notifications_sections.game_center !== 0) {
            this.updateNotifications({game_center: 0});
        }
    }

    updateNotifications = data => {
        const { patchNotificationsSections } = this.props;
        patchNotificationsSections(data);
    };

    render(){
        const { game_center: {center_info}, match } = this.props;
        return (
            <Fragment>
                {!center_info.state ?
                    <Preloader/>
                    :
                    <Switch>
                        <Route path={match.url} exact component={GameCenterDashboard} />
                        <Route path={`${match.url}/lobby`} exact component={GameLobby} />
                        <Route path={`${match.url}/proving-result`} exact component={UploadResults} />
                        <Route path={`${match.url}/result`} exact component={GameResults} />
                        <Route path={`${match.url}/select-friend`} exact component={SelectFriend} />
                        <Route path={`${match.url}/invite-friend`} exact component={InviteFriend} />
                        <Route component={NotFound} />
                    </Switch>
                }
            </Fragment>
        );
    }
}

function mapStateToProps({game_center, notifications}) {
    return{
        game_center,
        notifications
    }
}

const mapDispatchToProps = {
    getCenterInfo,
    setGameData,
    patchNotificationsSections
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCenterContainer);