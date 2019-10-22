import React, {Component} from 'react';
import {connect} from 'react-redux';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { getFaq } from "../../../actions/infoActions";
import { isArray } from "../../../helpers/functions";

import ExpandMoreIcon from '@material-ui/icons/KeyboardArrowRight';

import './Faq.scss';

class Faq extends Component {
    
    componentDidMount() {
        const { getFaq } = this.props;
        getFaq();
    }
    
    render(){
        const { info:{faq} } = this.props;
        if(!isArray(faq)) return <Preloader/>;
        return (
            <TransitionedBlock>
                <div className="faq_wrapper">
                    {faq.map((item, i) => (
                        <ExpansionPanel
                            key={i}
                            classes={{
                                root: 'faq_expand_root',
                                expanded: 'faq_expand_expanded'
                            }}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                classes={{
                                    root: 'panel_root'
                                }}
                            >
                                <h4>
                                    {item.title}
                                </h4>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <p>
                                    {item.text}
                                </p>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
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
    getFaq
};

export default connect(mapStateToProps, mapDispatchToProps)(Faq);