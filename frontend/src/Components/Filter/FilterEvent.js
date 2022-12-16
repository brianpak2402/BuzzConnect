import React, {useState, useEffect} from 'react';
import FilterLocation from "./FilterLocation";
import FilterHost from "./FilterHost";

import './Filter.css'

function FilterEvent() {
//
    const [locChoice, setLocChoice] = useState(null)
    const [hostChoice, setHostChoice] = useState(null)
    const [dateChoice, setDateChoice] = useState('')

    const handleLocChoice = (e) => {
        setLocChoice(e);
    };

    const handleHostChoice = (e) => {
        setHostChoice(e);
    }

    const handleDateChoice = event => {
        setDateChoice(event.target.value)
    }

    const setFilters = () => {
        if (dateChoice) {
            window.sessionStorage.setItem('dateChoice', dateChoice)
        } else {
            window.sessionStorage.setItem('dateChoice', null)
        }
        if (hostChoice) {
            window.sessionStorage.setItem('hostChoice', hostChoice)
        } else {
            window.sessionStorage.setItem('hostChoice', null)
        }
        if (locChoice) {
            window.sessionStorage.setItem('locChoice', locChoice)
        } else {
            window.sessionStorage.setItem('locChoice', null)
        }
        console.log("hostChoice",hostChoice)
        console.log("dateChoice",dateChoice)
        console.log("locChoice",locChoice)

    }

    const checkFilters = () => {
        console.log('dateChoice', window.sessionStorage.getItem('dateChoice'))
        console.log('hostChoice', window.sessionStorage.getItem('hostChoice'))
        console.log('locChoice', window.sessionStorage.getItem('locChoice'))
    }

    const reset = () => {
        window.sessionStorage.setItem('dateChoice', null)
        window.sessionStorage.setItem('hostChoice', null)
        window.sessionStorage.setItem('locChoice', null)
    }

    return (
        <div className='filter-wrapper'>
            <form className='filter'>
                <h1 className='label-lg'>FILTER BY</h1>
                <h2 className='label-md'>Location:</h2>
                <div style={{height: '11%', width: '100%'}}>
                    <FilterLocation setFilterLoc={handleLocChoice}/>
                </div>
                <div className='filter-blue-line' />
                <h2 className='label-md'>Host:</h2>
                <div style={{height: '11%', width: '100%'}}>
                    <FilterHost setFilterHost={handleHostChoice}/>
                </div>
                <div className='filter-blue-line' />
                <h2 className='label-md'>Date:</h2>
                <input className='filter-dropdown' type='text' id='date' onChange={handleDateChoice} value={dateChoice}/>
                <div className='filter-btn-row'>
                    <button className='filter-remove-btn' type='submit' onClick={setFilters}>Filter</button>
                    <button className='filter-reset-btn' onClick={reset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default FilterEvent