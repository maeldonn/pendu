import React from 'react';
import PropTypes from 'prop-types';

import './GameOver.css';

const GameOver = ({score, error, result, onClick}) => (
    <div className = "gameover" >
        <p>Vous avez {result === 'won' ? 'gagné' : 'perdu'} en faisant {error} erreurs sur {score} tentatives {result === 'won' ? '👍': '👎'}</p>
        <button onClick={() => onClick()}>RECOMMENCER (ESPACE)</button>
    </div>);

GameOver.propTypes = {
    score: PropTypes.number.isRequired,
    error: PropTypes.number.isRequired,
    result: PropTypes.oneOf(['won','loose', 'playing']).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default GameOver;