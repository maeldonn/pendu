import React from 'react';
import PropTypes from 'prop-types';

import './Keyboard.css';


const Keyboard = ({letter, feedback, onClick}) => (
    <div className = {`key ${feedback}`} onClick={() => {onClick(letter)}}>
        {letter}
    </div>);

Keyboard.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'clicked',
        'visible',
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Keyboard;