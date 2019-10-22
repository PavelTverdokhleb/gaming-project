import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';
import Lightbox from 'react-images';

import ArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import AppLogo from '../../../assets/image/g_logo.svg';

const NoImage = () => (
    <div className="no_photo_dispute">
        <p>«No photo yet»</p>
    </div>
);

class DisputeInfo extends Component {
    state = {
        image: null
    };

    openImageBox = (image) => {
        this.setState({image});
    };

    closeImageBox = () => {
        this.setState({image: null});
    };

    render() {
        const {creation_date, game_lobby, game_name, platform_name, opponent, agent} = this.props;
        const { image } = this.state;
        const { my_screenshot_1, my_screenshot_2, opponent_screenshot_1, opponent_screenshot_2, id, bet } = game_lobby;
        const { avatar, username } = opponent;
        return (
            <div className="dispute_info_wrapper">
                <div className="dispute_info_inner">
                    <div className="dispute_info_link">
                        <Link
                            to="/admin/dispute-center"
                        >
                            <ArrowIcon/>
                            Back to Disputs list
                        </Link>
                    </div>
                    <hr/>
                </div>
                <ScrollBar
                    maxHeight="calc(100vh - 150px)"
                >
                    <div className="dispute_scroll_inner">
                        <div className="dispute_info">
                            <h4 className="dispute_info_section_header">Game Details:</h4>
                            <div className="flex-center">
                                <div>
                                    <span className="dispute_info_label">Game #:</span>
                                    <p className="dispute_info_value">{id}</p>
                                </div>
                                <div>
                                    <span className="dispute_info_label">Date:</span>
                                    <p className="dispute_info_value">{moment(creation_date).format("DD.MM.YY")}</p>
                                </div>
                            </div>
                            {agent !== null ?
                                <div>
                                    <span className="dispute_info_label">Dispute Agent</span>
                                    <div className="dispute_info_agent">
                                        <div className="agent_logo_small">
                                            <Avatar
                                                src={agent.avatar}
                                            />
                                        </div>
                                        <p className="dispute_info_value">{agent.username}</p>
                                    </div>
                                </div>
                                : null
                            }
                            <div>
                                <span className="dispute_info_label">Opponent:</span>
                                <div className="dispute_info_opponent">
                                    <Avatar
                                        classes={{
                                            root: 'dispute_info_opponent_avatar'
                                        }}
                                        src={avatar}
                                    />
                                    <img src={AppLogo} alt="logo"/>
                                    <p>{username}</p>
                                </div>
                            </div>
                            <div>
                                <span className="dispute_info_label">Stake size:</span>
                                <p className="dispute_info_value">{bet} €</p>
                            </div>
                            <div>
                                <span className="dispute_info_label">Game & Platform:</span>
                                <p className="dispute_info_value">{`${game_name} (${platform_name})`}</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="dispute_screenshots">
                            <h4 className="dispute_info_section_header">Opponent Screenshots:</h4>
                            {(opponent_screenshot_1 === null && opponent_screenshot_2 === null) && <NoImage/>}
                            {opponent_screenshot_1 !== null ? <img src={opponent_screenshot_1} onClick={() => this.openImageBox(opponent_screenshot_1)} alt="screenshot"/> : null}
                            {opponent_screenshot_2 !== null ? <img src={opponent_screenshot_2} onClick={() => this.openImageBox(opponent_screenshot_2)} alt="screenshot"/> : null}
                            <h4 className="dispute_info_section_header">Your Screenshots:</h4>
                            {(my_screenshot_1 === null && my_screenshot_2 === null) && <NoImage/>}
                            {my_screenshot_1 !== null ? <img src={my_screenshot_1} onClick={() => this.openImageBox(my_screenshot_1)} alt="screenshot"/> : null}
                            {my_screenshot_2 !== null ? <img src={my_screenshot_2} onClick={() => this.openImageBox(my_screenshot_2)} alt="screenshot"/> : null}
                        </div>
                    </div>
                </ScrollBar>
                <Lightbox
                    images={image !== null ? [{src: image}] : []}
                    isOpen={image !== null}
                    onClose={this.closeImageBox}
                    backdropClosesModal
                    showImageCount={false}
                />
            </div>
        );
    }
}

export default DisputeInfo;