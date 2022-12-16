import React, {useState, useEffect} from 'react'
import {getAllLocations} from "../../services/LocationService";
import FilterLocationItem from "./FilterLocationItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faUser } from '@fortawesome/free-solid-svg-icons'

import './Filter.css'

function FilterLocation(props) {

    const [locs, setLocs] = useState([]);
    const [locChoice, setLocChoice] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const [display, setDisplay] = useState('filter-drop-menu-hidden')
    const [icon, setIcon] = useState(faChevronDown);

    useEffect(() => {
        getAllLocations()
            .then((res) => {
                res.forEach((elm) => {
                    setLocs((arr) => [...arr, {name: elm.name}])
                });
            })
            .catch((err) => {
               console.log(err)
            });
    }, []);

    const handleChange = (e) => {
        if (e) {
            setLocChoice(e);
            setDropDown(false);
            setDisplay('filter-drop-menu-hidden')
            props.setFilterLoc(e);
            setIcon(faChevronDown);
        }
    }

    const handleDropDown = () => {
        if (dropDown) {
            setDropDown(false);
            setDisplay('filter-drop-menu-hidden')
            setIcon(faChevronDown);
        } else {
            setDropDown(true);
            setDisplay('filter-drop-menu')
            setIcon(faChevronUp);
        }
    }

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div className='filter-dropdown-inner' onClick={() => {handleDropDown()}}>
                {locChoice}
                <FontAwesomeIcon icon={icon} style={{color: '#DCE2F5', marginLeft: '10px'}} />
            </div>
            <div className={display}>
                {dropDown && (locs).map(({name}) => (<div onClick={() => {handleChange(name)}}>
                    <FilterLocationItem name={name}/>
                </div>))}
            </div>
        </div>
    );
}

export default FilterLocation