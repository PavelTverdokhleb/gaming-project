import React from 'react';

const GameRules = ({rules}) => {
    const { controls, mode, half_length, speed, squad_type, disconnection } = rules;
    let arrDisc = disconnection.split('\n');
    return (
        <div className="game_rules_wrapper">
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
            <div className="game_rules-bottom_section">
                <span>Disconnection Rules:</span>
                {arrDisc && arrDisc.length ?
                    arrDisc.map((el, i) => (
                        <p key={i}>{el}</p>
                    ))
                    : null
                }
            </div>
        </div>
    );
};

export default GameRules;