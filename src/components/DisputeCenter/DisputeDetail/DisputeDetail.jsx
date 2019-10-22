import React, {Component} from 'react';
import {connect} from 'react-redux';
import DisputeInfo from './DisputeInfo';
import Dispute from '../Dispute/Dispute';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import NotFound from '../../NotFound/NotFound';

import { getDisputeDetail } from "../../../actions/disputeActions";

import './DisputeDetail.scss';

class DisputeDetail extends Component {

    componentDidMount() {
        const { getDisputeDetail, match:{params} } = this.props;
        if(!isNaN(params.id)) {
            getDisputeDetail(params.id);
        }
    }

    componentWillUnmount() {
        this.props.dispute.dispute_detail = {};
        this.props.dispute.error = {};
    }

    render(){
        const { dispute: {dispute_detail, error}, match:{params} } = this.props;
        console.log(error);
        if(isNaN(params.id) || error.detail) return <NotFound/>;
        else if(!dispute_detail.game_lobby) return <Preloader/>;
        return (
            <div className="dispute_detail_wrapper">
                <DisputeInfo
                    {...dispute_detail}
                />
                <div className="dispute_detail_container">
                    <Dispute
                        {...dispute_detail}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({dispute}) => {
    return{
        dispute
    }
};

const mapDispatchToProps = {
    getDisputeDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(DisputeDetail);