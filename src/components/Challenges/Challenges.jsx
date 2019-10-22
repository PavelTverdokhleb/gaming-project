import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChallengeItem from './ChallengeItem/ChallengeItem';
import Preloader from '../HelperComponents/Preloader/Preloader';
import TransitionedBlock from '../HelperComponents/TransitionedBlock/TransitionedBlock';
import ScrollBar from '../HelperComponents/ScrollBar/ScrollBar';

import { getChallengesList } from "../../actions/challengesActions";
import { isArray } from "../../helpers/functions";

import './Challenges.scss';

class Challenges extends Component {

    componentDidMount() {
        const { getChallengesList } = this.props;
        getChallengesList();
    }

    componentWillUnmount() {
        this.props.challenges.challenges_list = {};
    }

    render(){
        const { challenges:{ challenges_list } } = this.props;
        console.log(challenges_list);
        if(!challenges_list.loaded) return <Preloader/>;
        return (
            <TransitionedBlock>
                <div className="challenges_wrapper">
                    <ScrollBar
                        maxHeight="calc(100vh - 120px)"
                    >
                        <div className="challenges_inner">
                            <h2>Daily Challenges</h2>
                            {isArray(challenges_list.results) ?
                                <div className="challenges_list">
                                    {challenges_list.results.map((challenge, i) => (
                                        <ChallengeItem
                                            {...challenge}
                                            key={i}
                                        />
                                    ))}
                                </div>
                                :
                                'No challenges yet'
                            }
                        </div>
                    </ScrollBar>
                </div>
            </TransitionedBlock>
        );
    }
}

const mapStateToProps = ({challenges}) => {
    return{
        challenges
    }
};

const mapDispatchToProps = {
    getChallengesList
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);