import React, {Fragment} from 'react';
import XboxIcon from '../assets/image/XBOX_BG_Small.svg';
import PsnIcon from '../assets/image/PSN_BG_Small.svg';
import SteamIcon from '../assets/image/Steam_BG_Small.svg';
import XboxIconBig from '../assets/image/XBOX_BG_Big.svg';
import PsnIconBig from '../assets/image/PSN_BG_Big.svg';
import SteamIconBig from '../assets/image/Steam_BG_Big.svg';
import VictoryIcon from '../assets/image/victory@3x.png';
import DefeatIcon from '../assets/image/defeat@3x.png';
import DrawIcon from '../assets/image/draw@3x.png';
import XboxLogoIcon from '../assets/image/xbox_oval.svg';
import PsnLogoIcon from '../assets/image/psn_oval.svg';
import SteamLogoIcon from '../assets/image/steam_oval.svg';
import PlaystationSelectIcon from '../assets/image/select_playstation_logo.svg';
import XboxSelectIcon from '../assets/image/select_xbox_logo.svg';
import SteamSelectIcon from '../assets/image/select_steam_logo.svg';
import CircleIcon from '@material-ui/icons/FiberManualRecord';

import ChallengeGameControl from '../assets/image/challenge_gamepad_x10.png';
import ChallengeFireX5 from '../assets/image/challenge_fire_x5.png';
import ChallengeFireX3 from '../assets/image/challenge_fire_x3.png';
import ChallengeCoinX250 from '../assets/image/challenge_coin_x250.png';
import ChallengeCupX5 from '../assets/image/challenge_cup_x5.png';
import ChallengeMedal from '../assets/image/challenge_medal.png';

import WalletInIcon from '../assets/image/wallet_in.svg';
import WalletOutIcon from '../assets/image/wallet_out.svg';
import PromocodeIcon from '../assets/image/promocode_in.svg';

import WalletGameWinIcon from '../assets/image/wallet_game_win.svg';
import WalletGameLoseIcon from '../assets/image/wallet_game_lose.svg';
import WalletGameDrawIcon from '../assets/image/wallet_game_draw.svg';

export function getConsoleIcon(console) {
    switch (console) {
        case 'xbox':
            return <img src={XboxIcon} key={console} alt="xbox icon"/>;
        case 'psn':
            return <img src={PsnIcon} key={console} alt="psn icon"/>;
        case 'steam':
            return <img src={SteamIcon} key={console} alt="steam icon"/>;
        default:
            return null;
    }
}

export function getConsoleIconBig(console) {
    switch (console) {
        case 'xbox':
            return <img src={XboxIconBig} key={console} alt="xbox icon"/>;
        case 'psn':
            return <img src={PsnIconBig} key={console} alt="psn icon"/>;
        case 'steam':
            return <img src={SteamIconBig} key={console} alt="steam icon"/>;
        default:
            return null;
    }
}

export function getConnectedConsoles(platforms) {
    if(platforms && platforms.length) {
        return platforms.map(item => {
            if(item.profile_id && item.profile_id !== null) return getConsoleIcon(item.name.toLowerCase());
            else if(typeof(item) === 'string') return getConsoleIcon(item.toLowerCase());
            else return null;
        })
    }
}

export function getLastGameStatusImg(value) {
    if(value === 0) {
        return (
            <Fragment>
                <img src={DrawIcon} alt="draw icon"/>
                <div>
                    <span>Draw</span>
                </div>
            </Fragment>
        );
    } else if(value > 0) {
        return (
            <Fragment>
                <img src={VictoryIcon} alt="victory icon"/>
                <div>
                    <span className="victory_game">+{value} €</span>
                </div>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <img src={DefeatIcon} alt="defeat icon"/>
                <div>
                    <span className="defeat_game">{value} €</span>
                </div>
            </Fragment>
        );
    }
}

export function isArray(arr) {
    return arr && arr.length && arr.length > 0;
}

export function getLogoConsole(type) {
    switch (type) {
        case 'xbox':
            return <img className="logo_console" src={XboxLogoIcon} alt="xbox icon"/>;
        case 'psn':
            return <img className="logo_console" src={PsnLogoIcon} alt="psn icon"/>;
        case 'steam':
            return <img className="logo_console" src={SteamLogoIcon} alt="steam icon"/>;
        default:
            return 'Unrecognized type game profile';
    }
}

export function checkActionForParam(action, param) {
    let params = new URLSearchParams(action.meta.previousAction.payload.request.url.split('/')[3].substring(1));
    return params.get(param);
}

export function convertPosition(position) {
    switch (position) {
        case 1:
            return '1-st place.';
        case 2:
            return '2-nd place.';
        case 3:
            return '3-rd place.';
        default:
            return `${position}-th place.`
    }
}

export function convertMinutes(minutes) {
    let days = Math.floor(minutes / 24 / 60);
    let hours = Math.floor(minutes / 60 % 24);
    let min = Math.floor(minutes % 60);
    return `${days}d ${hours}h ${min}m`;
}

export function tickerSeconds(seconds) {
    if(seconds === 0) {
        return `00:00`;
    } else {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        if(min < 10) min = `0${min}`;
        if(sec < 10) sec = `0${sec}`;
        return `${min}:${sec}`;
    }
}

export function getSelectPlatformIcon(platform) {
    switch (platform) {
        case 'psn':
            return <img src={PlaystationSelectIcon} alt="playstation icon"/>;
        case 'xbox':
            return <img src={XboxSelectIcon} alt="xbox icon"/>;
        case 'steam':
            return <img src={SteamSelectIcon} alt="steam icon"/>;
        default:
            return null;
    }
}

export function getStatus(status) {
    switch (status) {
        case 'pending':
            return <p className="dispute_item_status dispute_status_pending">pending <CircleIcon/></p>;
        case 'win':
            return <p className="dispute_item_status dispute_status_win">win <CircleIcon/></p>;
        case 'loss':
            return <p className="dispute_item_status dispute_status_lost">lost <CircleIcon/></p>;
        case 'draw':
            return <p className="dispute_item_status dispute_status_draw">draw <CircleIcon/></p>;
        default :
            return null
    }
}

export function getChallengeIcon(challenge) {
    switch (challenge) {
        case 'play_10_games_today':
            return <img src={ChallengeGameControl} alt="challenge"/>;
        case 'win_5_games_in_a_row':
            return <img src={ChallengeFireX5} alt="challenge"/>;
        case 'win_3_games_in_a_row_with_different_opponent':
            return <img src={ChallengeFireX3} alt="challenge"/>;
        case 'win_250_euro_in_games':
            return <img src={ChallengeCoinX250} alt="challenge"/>;
        case 'win_5_games_today':
            return <img src={ChallengeCupX5} alt="challenge"/>;
        case 'get_the_1st_place_or_higher_in_the_leaderboard':
        case 'get_the_3rd_place_or_higher_in_the_leaderboard':
        case 'get_the_10th_place_or_higher_in_the_leaderboard':
            return <img src={ChallengeMedal} alt="challenge"/>;
        default :
            return null
    }
}


export function getTransactionIcon(type) {
    switch (type) {
        case "paypal_deposit":
            return <img src={WalletInIcon} alt="wallet"/>;
        case "paypal_withdraw":
            return <img src={WalletOutIcon} alt="wallet"/>;
        case "challenge":
        case "invitation_invitee":
        case "invitation_inviter":
        case "intro_reward":
            return <img src={PromocodeIcon} alt="wallet"/>;
        default:
            return null;
    }
}

export function getGamesTransactionIcon(status) {
    switch (status) {
        case "draw":
            return <img src={WalletGameDrawIcon} alt="game"/>;
        case "win":
            return <img src={WalletGameWinIcon} alt="game"/>;
        case "loss":
            return <img src={WalletGameLoseIcon} alt="game"/>;
        default:
            return null;
    }
}