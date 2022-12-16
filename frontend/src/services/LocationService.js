import axios from 'axios';

// Use data directly from Georgia Tech's GT PLACES API
export async function getData() {
    return axios.get('https://m.gatech.edu/api/gtplaces/buildings/', {
        headers:{
            'Accept': 'application/json',
        },
    }).then(response => { 
        return (response.data).map(place => {
            return {
                name: place.name,
                longitude: place.longitude,
                latitude: place.latitude,
            }
        })
    }).catch(err => err);
}

export async function createLocation(name, latitude, longitude) {
    return axios.post('http://localhost:8080/buzzconnect/locations/create', new URLSearchParams({
        name,
        latitude,
        longitude,
    })).then(response => response.data)
    .catch(err => {
        return err;
    });
}

export async function getAllLocations() {
    return axios.get('http://localhost:8080/buzzconnect/locations/all').then(response => {
        return response.data;
    }).catch(err => {
        return err;
    })
}

export async function getLocation(locationId) {
    return axios.get(`http://localhost:8080/buzzconnect/locations/info/${locationId}`).then(response => {
        return response.data;
    }).catch(err => {
        return err;
    })
}

export async function searchLocation(query) {
    return axios.get('http://localhost:8080/buzzconnect/locations/search', new URLSearchParams({
        query,
    })).then(response => response.data).catch(err => err);
}

export async function addEventToLocation(locationId, eventId) {
    return axios.post(`http://localhost:8080/buzzconnect/locations/${locationId}/addEvent`, new URLSearchParams({
        eventId,
    })).then(response => {
        return response.data;
    }).catch(err => err);
}


