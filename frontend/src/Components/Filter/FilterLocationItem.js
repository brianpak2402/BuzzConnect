import React from 'react';

import './Filter.css'

function FilterLocationItem(props) {
    return (
        <div className='filter-drop-val'>
            {props.name}
        </div>
    );
}

export default FilterLocationItem