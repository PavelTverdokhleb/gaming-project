import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spring} from 'react-spring/renderprops';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getChallengeIcon } from "../../../helpers/functions";
import { postChallengeReward } from "../../../actions/challengesActions";

import LockedIcon from '../../../assets/image/locker.svg';

import './ChallengeItem.scss';

class ChallengeItem extends Component {
    state = {
        position: 0,
        loading: false
    };

    componentDidMount() {
        const { total_divisions, current_divisions } = this.props;
        let position = Math.floor((current_divisions * 100) / total_divisions);
        this.setState({position});
    }

    getReward = () => {
        const { postChallengeReward, variation } = this.props;
        this.setState({loading: true});
        postChallengeReward({variation}).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                this.setState({loading: false});
            }
            console.log(res);
        })
    };

    render(){
        const { description, reward, variation, claim_availability, is_completed, can_claim } = this.props;
        const { position, loading } = this.state;

        const locked = claim_availability !== null;

        return (
            <Spring
                from={{ position: 0, opacity: 0 }}
                to={{ position: position, opacity: 1 }}
            >
                {props =>
                    <div className="challenge_item_wrapper" style={{opacity: props.opacity}}>
                        {is_completed && <div className="challenge_completed"><p>completed!</p></div>}
                        <div className="flex-center">
                            {getChallengeIcon(variation)}
                            {locked ?
                                <p className="challenge_availability">{`Available on ${moment(claim_availability).format("DD.MM.YY (HH:mm:ss)")}`}</p>
                                : null
                            }
                        </div>
                        <div className="challenge_info">
                            <div>
                                <span>Conditions:</span>
                                <p>{description}</p>
                            </div>
                            <div>
                                <span>Reward:</span>
                                <p>{reward} €</p>
                            </div>
                        </div>
                        <div className="challenge_progress">
                            <div
                                id="progress"
                                className="progress_bar"
                            >
                                <div className="progress_line" style={{width: `${props.position}%`}}>
                                    <div className="progress_thumb"></div>
                                </div>
                            </div>
                            {locked ?
                                <button
                                    className="challenge_claim_btn locked"
                                    disabled
                                >
                                    <img src={LockedIcon} alt="locked"/>
                                </button>
                                :
                                <button
                                    className="challenge_claim_btn"
                                    disabled={is_completed || !can_claim}
                                    onClick={this.getReward}
                                >
                                    {loading ?
                                        <CircularProgress size={20}/>
                                        :
                                        "CLAIM"
                                    }
                                </button>
                            }
                        </div>
                    </div>
                }
            </Spring>
        );
    }
}

const mapDispatchToProps = {
    postChallengeReward
};

export default connect(null, mapDispatchToProps)(ChallengeItem);