import React from 'react'
import PropTypes from 'prop-types';

function Button({ id, charcter, handleClick }) {
    return (
        <button id={id} onClick={handleClick.bind(null, charcter)}>{charcter}</button>
    )
}

Button.propTypes = {
    id: PropTypes.string.isRequired,
    charcter: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default Button