import React, { useState, useEffect } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import Navbar from '../../components/Navbar/Navbar';
import { FaMapPin } from 'react-icons/fa'
import { getAllEventsForUser } from '../../services/EventService'
import 'mapbox-gl/dist/mapbox-gl.css';
import './EventsMap.css'

export default function EventsMap() {
    const token = "pk.eyJ1IjoiYnJpYW5wYWsyNDAyIiwiYSI6ImNsYW92ODkyOTBiazEzbnM0amVxamw1MGMifQ.lyYhrtUDW39kBwvUAgUzEA";
    const mapStyle = 'mapbox://styles/gt-scheduler/cktc4y61t018918qjynvngozg';
    var [ events, setEvents ] = useState([]);
    const [popupOpen, setPopupOpen] = useState({});                                        

    useEffect(() => {
        const userId = window.sessionStorage.getItem("userId");
        if (userId !== null) {
            getAllEventsForUser(userId).then(response => {
                setEvents(response.data)
            })
        }
    }, []) 

    return (
        <div>
            <Navbar/>
            <div className='map-header'>
                <h1 className='map-header'>Map</h1>
                <div className='map-yllw-line' />
            </div>
            <div className='mapbox'>
                <Map initialViewState={{
                        latitude: 33.7765,
                        longitude: -84.3963,
                        zoom: 14,
                    }}
                    mapStyle={mapStyle}
                    mapboxAccessToken={token}
                >
                {
                    events.map((event, i) => {
                        const hostChoice = window.sessionStorage.getItem("hostChoice");
                        const dateChoice = window.sessionStorage.getItem("dateChoice");
                        const locChoice = window.sessionStorage.getItem("locChoice");

                        const date = event.dateTime.slice(0, 10);
                        const time = event.dateTime.slice(10);
                        const host = event.hostName;
                        const loc = event.location.name;

                        // no filters
                        if (hostChoice === "null" && dateChoice === "null" && locChoice === "null") {
                            return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                        } 
                        // only host filter
                        else if (hostChoice != null && dateChoice === "null" && locChoice === "null") {
                            if (hostChoice != null && hostChoice.localeCompare(host) === 0) {
                                return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                            } 
                        } 
                        // only date filter
                        else if (hostChoice === "null" && dateChoice != null && locChoice === "null") {
                            if (dateChoice != null && dateChoice.localeCompare(date) === 0) {
                                return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                            } 
                        }
                        // only loc filter
                        else if (hostChoice === "null" && dateChoice === "null" && locChoice != null) {
                            if (locChoice != null && locChoice.localeCompare(loc) === 0) {
                                return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                            }
                        }
                        // host and date filter
                        else if (hostChoice != null && dateChoice != null && locChoice === "null") {
                            if (hostChoice.localeCompare(host) === 0 && dateChoice.localeCompare(date) === 0) {
                                return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                            }
                        }
                        // host and loc filter
                        else if (hostChoice != null && dateChoice === "null" && locChoice != null) {
                            if (hostChoice.localeCompare(host) === 0 && locChoice.localeCompare(loc) === 0) {
                                return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                            }
                        }
                        // date and loc filter
                        else if (hostChoice === "null" && dateChoice != null && locChoice != null) {
                            if (dateChoice.localeCompare(date) === 0 && locChoice.localeCompare(loc) === 0) {
                                return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                            }
                        }
                        // all filters
                        else if (hostChoice != null && dateChoice != null && locChoice != null) {
                            if (hostChoice.localeCompare(host) === 0 && dateChoice.localeCompare(date) === 0 && locChoice.localeCompare(loc) === 0) {
                                return (<div key={event.id}>
                                <Marker 
                                longitude={event.location.longitude} 
                                latitude={event.location.latitude} 
                                anchor="bottom" 
                                key={i}
                                onClick={() => {
                                    setPopupOpen({...popupOpen, [event.id]: true })
                                }}
                                >
                                    <FaMapPin size={20} color="red" />
                                </Marker>
                                {
                                    popupOpen[event.id] && (
                                        <Popup 
                                            longitude={event.location.longitude} 
                                            latitude={event.location.latitude}
                                            anchor={"center"}
                                            maxWidth="400px"
                                            closeOnClick={false}
                                            onClose={() => setPopupOpen(false)}
                                            key={i}
                                        >
                                        <div className="event-box">
                                            <h1>{event.title}</h1>
                                            <h2>Location: {event.location.name}</h2>
                                            <h2>Date: {date}</h2>
                                            <h2>Time: {time}</h2>
                                        </div>
                                        </Popup>
                                    )
                                }
                                </div>)
                            }
                        }
                    })
                }
                </Map>
            </div>
        </div>
    );
}