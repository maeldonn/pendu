import React from 'react';
import PropTypes from 'prop-types';

import './Score.css';

const Score = ({score, error}) => (
    <div className = "score">
        <p>Nombre d'essais : {score}</p>
        <p>Nombre d'erreurs : {error}/10</p>
    </div>);

Score.propTypes = {
    score: PropTypes.number.isRequired,
    error: PropTypes.number.isRequired,
};

export default Score;