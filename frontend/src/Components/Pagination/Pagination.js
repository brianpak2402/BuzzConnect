import React, {useState, useMemo, useEffect} from 'react';
import AccordionDropdown from "../AccordionDropdown/AccordionDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight,faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './Pagination.css';

function Pagination(props) {
    const arrs = useMemo(() => split(props.component), [props.component])
    const numPages = arrs.length
    const [currPage, setCurrPage] = useState(1)
    const [lastPage, setLastPage] = useState(numPages)
    const [firstPage, setFirstPage] = useState(arrs.at(0))
    const [closeAll, setCloseAll] = useState(false)

    function generatePage() {
        setFirstPage(arrs.at(currPage - 1))
    }

    const pageLeft = event => {
        if (currPage === 1) {
            setCurrPage(1);
            return
        }
        setCurrPage(currPage - 1);
    }

    function pageRight() {
        if (currPage === numPages || numPages === null) {
            setCurrPage(numPages);
            return
        }
        setCurrPage(currPage + 1)
    }

    const close = () => {
        setCloseAll(true);
    }

    useEffect(() => {
        if (numPages === 1) {
            setLastPage(null);
        }

        setFirstPage(arrs.at(currPage - 1));
    }, [arrs, currPage, numPages])

    useEffect(() => {
        if (closeAll) {
            console.log(closeAll)
        }
        setCloseAll(false)
    }, [closeAll])

    function split(component) {
        let arrs = []
        while (component.length > 0) {
            let arr = component.splice(0, 10);
            arrs.push(arr)
            console.log('arr', arr);
        }
        return arrs
    }

    let key = 0;
    return (
        <div className='pagination'>
            <div className='events'>
                {(firstPage).map(({title, hostName, location, dateTime, description, isOwner, userType, id, inviteOnlyStatus, isUserInvited, closeAll}) => (
                    <AccordionDropdown title={title} hostName={hostName} location={location} dateTime={dateTime} description={description} 
                                       isOwner={isOwner} userType={userType} id={id} isInviteOnly={inviteOnlyStatus} isUserInvited={isUserInvited}
                                       closeAll={closeAll} key={key++}/>
                ))}
            </div>
            <div className='nums'>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => {pageLeft(); generatePage(); close();}} style={{cursor: 'pointer'}}/>
                <label>{currPage}</label>
                <FontAwesomeIcon icon={faEllipsis}/>
                <label>{lastPage}</label>
                <FontAwesomeIcon icon={faChevronRight} onClick={() => {
                    pageRight();
                    generatePage();
                    close();
                }} style={{cursor: 'pointer'}}/>

            </div>
        </div>
    );
}



export default Pagination

/*
Props:
component

*/

/*{() => {close(); pageLeft(); generatePage();}}*/