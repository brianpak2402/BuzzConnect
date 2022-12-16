import React, {useState, useEffect} from 'react';
import {getAllHosts} from "../../services/HostService";
import FilterHostItem from "./FilterHostItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faUser } from '@fortawesome/free-solid-svg-icons'

import './Filter.css'

function FilterHost(props) {

    const [hosts, setHosts] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [hostChoice, setHostChoice] = useState('');

    const [display, setDisplay] = useState('filter-drop-menu-hidden');
    const [icon, setIcon] = useState(faChevronDown);

    useEffect(() => {
        getAllHosts()
            .then((res) => {
                (res.data).forEach((elm) => {
                    setHosts((arr) => [...arr, elm])
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const handleDropDown = () => {
        if (dropDown) {
            console.log(dropDown)
            setDropDown(false)
            setDisplay('filter-drop-menu-hidden');
            setIcon(faChevronDown);
        } else {
            setDropDown(true)
            setDisplay('filter-drop-menu');
            setIcon(faChevronUp);
        }
    }

    const handleChoice = (e) => {
        if (e) {
            setHostChoice(e);
            setDropDown(false);
            setDisplay('filter-drop-menu-hidden')
            props.setFilterHost(e);
            setIcon(faChevronDown);
        }
    }

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div className='filter-dropdown-inner' onClick={() => {handleDropDown()}}>
                {hostChoice}
                <FontAwesomeIcon icon={icon} style={{color: 'DCE5F2', marginLeft: '10px'}}/>
            </div>
            <div className={display}>
                {dropDown && hosts.map(({username}) => (<div onClick={() => handleChoice(username)}>
                    <FilterHostItem name={username}/>
                </div>))}
            </div>
        </div>
    );
}

export default FilterHost