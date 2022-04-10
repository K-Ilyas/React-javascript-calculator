import React from 'react'
import PropTypes from 'prop-types';

function Result({ result }) {
    return (
        <div id="display-container">
            <input type="text" name="display" id="display" readOnly value={result} />
        </div>
    )
}

Result.propTypes = {
    result: PropTypes.string.isRequired
}

export default Result