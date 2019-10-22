import React, {Component} from 'react';

import { tickerSeconds } from "../../../helpers/functions";

import './Ticker.scss';

class Ticker extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.thumbs = [...Array(60).keys()];
        let time = props.started !== undefined && props.started !== null ? (new Date().getTime() - new Date(props.started)) / 1000 : 0;
        this.state = {
            time: time
        };
    }

    componentDidMount() {
        const { inGame, ended } = this.props;
        if(inGame && this.timer === null && ended === null) {
            this.timer = setInterval(() => {
                this.tick();
            }, 1000);
        }
    }

    componentDidUpdate() {
        const { inGame, ended } = this.props;
        if(inGame && this.timer === null) {
            this.timer = setInterval(() => {
                this.tick();
            }, 1000);
        }
        if(ended !== null) clearInterval(this.timer);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        const { started } = this.props;
        let startDate = new Date(started);
        let nowDate = new Date();
        let time = (nowDate.getTime() - startDate.getTime()) / 1000;
        this.setState({
            time: time
        });
    }

    render(){
        const { thumbs, state:{time}, props:{started, ended, submitResults} } = this;
        return (
            <div className="center_container">
                <div className="ticker_wrapper">
                    <div className="thicker_face">
                        {thumbs.map((thumb, i) => (
                            <div className="thumb" style={{transform: `rotate(${(i + 1) * 6}deg)`}} key={i}>
                                <div className="thumb_mark"></div>
                            </div>
                        ))}
                        <div className="thumb thumb_bar" style={{transform: `rotate(${time * 6}deg)`}}>
                            <div className="ticker_bar"></div>
                        </div>
                    </div>
                    <div className="ticker_info_wrapper">
                        <div className="ticker_display">
                            <time>
                                {ended && ended !== null ? tickerSeconds((new Date(ended).getTime() - new Date(started).getTime()) / 1000) : tickerSeconds(time)}
                            </time>
                        </div>
                        <span className="ticker_info">{submitResults ? 'Game over' : 'Game Time'}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ticker;