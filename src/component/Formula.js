import React from 'react'
import PropTypes from 'prop-types';


function Formula({ formula }) {
    return (
        <div id="formula-container">
            <p id="formula" value={formula}  >{formula}</p>
        </div>
    )
}

Formula.propTypes = {
    formula: PropTypes.string.isRequired
}

export default Formula