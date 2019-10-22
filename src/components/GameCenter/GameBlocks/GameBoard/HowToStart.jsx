import React from 'react';

const HowToStart = (props) => {
    let arrSteps = [
        'Add your opponent as a friend on your console',
        'Click on Start Game in your Gaming Stars app or website',
        'Wait until your opponent also confirmed',
        'Play the game on your console against your opponent',
        'Click on Finish Game after the match has ended',
        'Submit the result'
    ];
    return (
        <div className="how_to_start_wrapper">
            {arrSteps.map((el, i) => (
                <div className="how_to_start_item" key={i}>
                    <span>{i + 1}</span>
                    <p>{el}</p>
                </div>
            ))}
            <div className="how_to_start_info">
                <span>Important:</span>
                <p>If both players claim to have won, a dispute is opened. In this case, screenshots of the result page have to be provided from both players. Players who do not provide valid screenshots lose the game automatically. </p>
            </div>
        </div>
    );
};

export default HowToStart;