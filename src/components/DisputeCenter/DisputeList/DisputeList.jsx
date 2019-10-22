import React, {Component} from 'react';
import {connect} from 'react-redux';
import DisputeItem from '../DisputeItem/DisputeItem';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import Pagination from '../../HelperComponents/Pagination/Pagination';

import { isArray } from "../../../helpers/functions";
import { getDisputesList } from "../../../actions/disputeActions";

import './DisputeList.scss';

class DisputeList extends Component {
    state = {
        activePage: 1
    };

    componentDidMount() {
        const { activePage } = this.state;
        this.doRequest(activePage)
    }

    componentWillUnmount() {
        this.props.dispute.disputes_list = {};
    }

    doRequest = (page) => {
        const { getDisputesList } = this.props;
        getDisputesList(page);
    };

    changePage = (name, page) => {
        this.setState({activePage: page});
        this.doRequest(page);
    };

    render(){
        const { dispute: {disputes_list} } = this.props;
        const { activePage } = this.state;
        return (
            <div className="dispute_center_wrapper">
                <h2>Dispute Center</h2>
                <div className="dispute_list">
                    {disputes_list.loaded ?
                        isArray(disputes_list.results) ?
                            disputes_list.results.map(dispute => (
                                <DisputeItem
                                    key={dispute.id}
                                    {...dispute}
                                />
                            ))
                            :
                            <div>You don't have disputes yet</div>
                        :
                        <Preloader/>
                    }
                </div>
                {disputes_list.count > 9 ?
                    <Pagination
                        name="disputes"
                        current={activePage}
                        onChange={this.changePage}
                        total={disputes_list.count}
                        pageCount={9}
                    />
                    : null
                }
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
    getDisputesList
};

export default connect(mapStateToProps, mapDispatchToProps)(DisputeList);