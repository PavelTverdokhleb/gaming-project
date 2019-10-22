import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import SnackBar from '../../../HelperComponents/SnackBar/SnackBar';
import ThankBlock from '../ThankBlock/ThankBlock';

import { postUploadResult } from "../../../../actions/gameCenterActions";

import EvidenceBorderImg from '../../../../assets/image/evidence_border.svg';
import EvidencePhotoUImg from '../../../../assets/image/evidence_photo.svg';
import CloseIcon from '@material-ui/icons/Close';

import './UploadResults.scss';

class UploadResults extends Component {
    state = {
        screenshot_1: null,
        screenshot_2: null,
        screenshot_1_Preview: null,
        screenshot_2_Preview: null,
        loading: false,
        showInfo: false,
        success: false,
        errorUpload: null
    };

    handleImageChange = (e, name) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if(file) {
            reader.onloadend = () => {
                this.setState({
                    [name]: file,
                    [`${name}_Preview`]: reader.result
                });
            };
            reader.readAsDataURL(file)
        }
    };

    clearEvidence = (name) => {
        this.setState({
            [name]: null,
            [`${name}_Preview`]: null
        })
    };

    closeInfo = () => {
        this.setState({showInfo: false});
    };

    submitResults = () => {
        const { postUploadResult } = this.props;
        const { screenshot_1, screenshot_2 } = this.state;
        if(screenshot_1 !== null || screenshot_2 !== null) {
            const formData = new FormData();
            if(screenshot_1 !== null) {
                formData.append('screenshot_1', screenshot_1);
                if(screenshot_2 !== null) {
                    formData.append('screenshot_2', screenshot_2);
                }
            } else {
                if(screenshot_2 !== null) {
                    formData.append('screenshot_1', screenshot_2);
                }
            }
            this.setState({loading: true});
            postUploadResult(formData).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 201) {
                    this.setState({success: true});
                } else if(res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                    this.setState({loading: false, errorUpload: res.error.response.data});
                } else {
                    this.setState({loading: false, errorUpload: {error: ["File is too large"]}});
                }
            });
        } else {
            this.setState({showInfo: true});
        }
    };

    getError = () => {
        const { errorUpload } = this.state;
        if(errorUpload !== null) {
            let arr = [];
            for(let i in errorUpload) {
                let elem = errorUpload[i].map(el => <p>{el}</p>);
                arr.push(elem);
            }
            return arr;
        } else {
            return null;
        }
    };

    render(){
        const { screenshot_1_Preview, screenshot_2_Preview, loading, showInfo, success, errorUpload } = this.state;
        if(success) return <ThankBlock/>;
        console.log(errorUpload);
        return (
            <div className="block_center">
                <div className="content_center upload_results">
                    <div className="upload_results_top_wrapper">
                        <h2 className="title">Upload your results</h2>

                        <input
                            id="screenshot_1"
                            className="evidence_input"
                            type="file"
                            onChange={(e) => this.handleImageChange(e, 'screenshot_1')}
                        />

                        <input
                            id="screenshot_2"
                            className="evidence_input"
                            type="file"
                            onChange={(e) => this.handleImageChange(e, 'screenshot_2')}
                        />

                        {screenshot_1_Preview === null ?
                            <button
                                className="evidence_btn"
                                onClick={() => document.getElementById('screenshot_1').click()}
                            >
                                <img src={EvidenceBorderImg} alt="evidence border"/>
                                <div className="evidence_btn_info">
                                    <img src={EvidencePhotoUImg} alt="evidence"/>
                                    <p>Screenshot #1</p>
                                    <span>Click for upload</span>
                                </div>
                            </button>
                            :
                            <div className="preview_container">
                                <img src={screenshot_1_Preview} alt="preview"/>
                                <button
                                    className="evidence_delete"
                                    onClick={() => this.clearEvidence('screenshot_1')}
                                >
                                    <CloseIcon/>
                                </button>
                            </div>
                        }

                        {screenshot_2_Preview === null ?
                            <button
                                className="evidence_btn"
                                onClick={() => document.getElementById('screenshot_2').click()}
                            >
                                <img src={EvidenceBorderImg} alt="evidence"/>
                                <div className="evidence_btn_info">
                                    <img src={EvidencePhotoUImg} alt="evidence"/>
                                    <p>Screenshot #2</p>
                                    <span>Click for upload</span>
                                </div>
                            </button>
                            :
                            <div className="preview_container">
                                <img src={screenshot_2_Preview} alt="preview"/>
                                <button
                                    className="evidence_delete"
                                    onClick={() => this.clearEvidence('screenshot_2')}
                                >
                                    <CloseIcon/>
                                </button>
                            </div>
                        }

                        <div className="opponent_need_add_friends">
                            <p>Upload your in-game screenshot or photo, so that we can confirm the authenticity of your result.</p>
                        </div>
                    </div>
                    <DefaultButton
                        type="green"
                        loading={loading}
                        onClick={this.submitResults}
                    >
                        SUBMIT
                    </DefaultButton>
                    <div className="upload_error">
                        {this.getError()}
                    </div>
                    <SnackBar
                        open={showInfo}
                        onClose={this.closeInfo}
                        classes="game_over_info"
                    >
                        you must upload at least 1 screenshot to finish submitting the results of this game
                    </SnackBar>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        postUploadResult
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(UploadResults);