import React from 'react'

import './Filter.css'

function FilterHostItem(props) {
    return (
        <div className='filter-drop-val'>
            {props.name}
        </div>
    );
}

export default FilterHostItem