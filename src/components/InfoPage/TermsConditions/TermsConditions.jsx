import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';

import { getInfo } from "../../../actions/infoActions";

class TermsConditions extends Component {

    componentDidMount() {
        const { getInfo } = this.props;
        getInfo('terms');
    }

    componentWillUnmount() {
        this.props.info.terms = {};
    }

    render(){
        const { info:{terms} } = this.props;
        const { title, html } = terms;
        if(!title) return <Preloader/>;
        return (
            <TransitionedBlock>
                <div className="info_content_wrapper">
                    <ScrollBar
                        maxHeight="calc(100vh - 250px)"
                    >
                        <div className="info_content">
                            <h2>{title}</h2>
                            <div dangerouslySetInnerHTML={{__html: html}}></div>
                        </div>
                    </ScrollBar>
                </div>
            </TransitionedBlock>
        );
    }
}

const mapStateToProps = ({info}) => {
    return{
        info
    }
};

const mapDispatchToProps = {
    getInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);