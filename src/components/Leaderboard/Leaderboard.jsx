import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TopThree from './TopThree/TopThree';
import LeaderboardTable from './LeaderboardTable/LeaderboardTable';
import Preloader from '../HelperComponents/Preloader/Preloader';
import TransitionedBlock from '../HelperComponents/TransitionedBlock/TransitionedBlock';

import { getLeaderboard } from "../../actions/leaderboardActions";

import './Leaderboard.scss';

class Leaderboard extends Component {

    componentDidMount() {
        const { getLeaderboard } = this.props;
        getLeaderboard();
    }

    componentWillUnmount() {
        this.props.leaderboard.leaderboard_list = {};
    }
    
    render() {
        const { leaderboard:{leaderboard_list:{top3, top4_10}} } = this.props;
        if(!top3) return <Preloader/>;
        return (
            <TransitionedBlock>
                <div className="leaderboard_wrapper">
                    <h2 className="page_title">
                        Leaderboard
                    </h2>
                    <TopThree
                        data={top3}
                    />
                    <LeaderboardTable
                        data={top4_10}
                    />
                </div>
            </TransitionedBlock>
        );
    }
}

function mapStateToProps(state) {
    return{
        leaderboard: state.leaderboard
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLeaderboard
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);