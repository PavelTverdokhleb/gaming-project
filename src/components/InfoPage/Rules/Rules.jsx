import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';

import { getGamesList, getGameRules } from "../../../actions/infoActions";
import { isArray } from "../../../helpers/functions";

import './Rules.scss';

class Rules extends Component {
    state = {
        value: null,
        loading: true
    };

    componentDidMount() {
        const { getGamesList, info:{games_list} } = this.props;
        if(isArray(games_list)) {
            const { short_name, id } = games_list[0];
            this.getRules({label: short_name, value: id});
        } else {
            getGamesList().then(res => {
                if(res.payload && res.payload.status === 200) {
                    const { short_name, id } = res.payload.data[0];
                    this.getRules({label: short_name, value: id});
                }
            })
        }
    }

    componentWillUnmount() {
        this.props.info.game_rules = {};
    }

    getRules = (data) => {
        const { getGameRules } = this.props;
        this.setState({loading: true});
        getGameRules(data.value).then(res => {
            if(res.payload && res.payload.status === 200) {
                this.setState({value: data, loading: false});
            } else {
                this.setState({loading: false});
            }
        });
    };

    changeGame = (value) => {
        this.getRules(value);
    };

    renderRules = (rules) => {
        const { mode, half_length, controls, speed, squad_type, disconnection } = rules;
        let arr = disconnection.split('\n');
        return (
            <Fragment>
                <div className="game_rules-top_section">
                    <div className="game_rules_row">
                        <div>
                            <span>Game Mode:</span>
                            <p>{mode}</p>
                        </div>
                        <div>
                            <span>Half Length: </span>
                            <p>{half_length}m</p>
                        </div>
                    </div>
                    <div className="game_rules_row">
                        <div>
                            <span>Controls:</span>
                            <p>{controls}</p>
                        </div>
                        <div>
                            <span>Game Speed:</span>
                            <p>{speed}</p>
                        </div>
                        <div>
                            <span>Squad Type:</span>
                            <p>{squad_type}</p>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="rules_disconnect">
                    <h4>Disconnection Rules:</h4>
                    {arr.map((el, i) => (
                        <p key={i}>{el}</p>
                    ))}
                </div>
            </Fragment>
        );
    };

    render(){
        let arrSteps = [
            'Add your opponent as a friend on your console',
            'Click on Start Game in your Gaming Stars app or website',
            'Wait until your opponent also confirmed',
            'Play the game on your console against your opponent',
            'Click on Finish Game after the match has ended',
            'Submit the result'
        ];
        const { info:{games_list, game_rules, error} } = this.props;
        const { value, loading } = this.state;
        let gamesList = games_list.map(({short_name, id}) => ({label: short_name, value: id}));
        const styles = {
            control: () => ({
                minWidth: `${value !== null ? (8*value.label.length) + 70 : 130}px`,
                display: 'flex'
            })
        };
        return (
            <TransitionedBlock>
                <div className="rules_wrapper">
                    <ScrollBar
                        maxHeight="calc(100vh - 250px)"
                    >
                        <div className="rules_inner">
                            <h2>How to play?</h2>
                            <div className="rules_start_wrapper">
                                {arrSteps.map((el, i) => (
                                    <div className="how_to_start_item" key={i}>
                                        <span>{i + 1}</span>
                                        <p>{el}</p>
                                    </div>
                                ))}
                            </div>
                            <h4>Important:</h4>
                            <p>
                                If both players claim to have won, a dispute is opened. In this case, screenshots of the result page have to be provided from
                                both players. Players who do not provide valid screenshots lose the game automatically.
                            </p>
                            <hr/>
                            <div className="flex-center">
                                <h2>Game rules for</h2>
                                <Select
                                    className="rules_select_wrapper"
                                    classNamePrefix="rules_select"
                                    value={value}
                                    onChange={this.changeGame}
                                    isLoading={!isArray(gamesList) || loading}
                                    isClearable={false}
                                    isSearchable={false}
                                    options={gamesList}
                                    placeholder=""
                                    styles={styles}
                                />
                                {error.non_field_errors ? <p className="game_rules_error">{error.non_field_errors[0]}</p> : null}
                            </div>
                            {game_rules.id ?
                                this.renderRules(game_rules)
                                :
                                <div className="game_rules_preload">
                                    <CircularProgress size={50}/>
                                </div>
                            }
                        </div>
                    </ScrollBar>
                </div>
            </TransitionedBlock>
        );
    }
}

const mapStateToProps = ({info}) => {
    return {
        info
    }
};

const mapDispatchToProps =  {
    getGamesList,
    getGameRules
};

export default connect(mapStateToProps, mapDispatchToProps)(Rules);