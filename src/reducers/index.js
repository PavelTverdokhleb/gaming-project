import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import UserReducer from './reducerUser';
import ProfileReducer from './reducerProfile';
import LeaderboardReducer from './reducerLeaderboard';
import FriendsReducer from './reducerFriends';
import IntroReducer from './reducerIntro';
import GameCenterReducer from './reducerGameCenter';
import NotificationsReducer from './reducerNotifications';
import ChatReducer from './reducerChat';
import DisputeReducer from './reducerDispute';
import ChallengesReducer from './reducerChallenges';
import InfoReducer from './reducerInfo';
import WalletReducer from './reducerWallet';
import {reducer as formReducer} from 'redux-form';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    user: UserReducer,
    profile: ProfileReducer,
    leaderboard: LeaderboardReducer,
    friends: FriendsReducer,
    intro: IntroReducer,
    game_center: GameCenterReducer,
    notifications: NotificationsReducer,
    chat: ChatReducer,
    dispute: DisputeReducer,
    challenges: ChallengesReducer,
    info: InfoReducer,
    wallet: WalletReducer
});

export default rootReducer;