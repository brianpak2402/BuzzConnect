import api from './API'

export async function getAllAttendees() {
  try {
    const res = await api.get("/attendees/all");
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function rsvpToEvent(attendeeId, eventId, rsvpStatus) {
  console.log("rsvpd to event", attendeeId, eventId, rsvpStatus);
  const params = {
    attendeeId,
    rsvpStatus, 
  }
  try {
    const res = await api.post(`/events/${eventId}/rsvp/request`, new URLSearchParams(params));
    return res;
  } catch (err) {
    return err;
  }
}

export async function removeRsvpFromEvent(attendeeId, eventId) {
  const params = {
    attendeeId,
  }
  try {
    const res = await api.post(`/events/${eventId}/rsvp/remove`, new URLSearchParams(params));
    return res;
  } catch (err) {
    return err;
  }
}

export async function listEventsToAttend(attendeeId) {
    try {
        const res = await api.get(`attendees/${attendeeId}/events`);
        return res.data;
    } catch (error) {
      return error;
    }
}

export async function createAttendee(username, password) {
  const params = {
    username: username,
    password: password
  }
  try {
    const res = await api.post("/attendees/create/", new URLSearchParams(params));
    return res;
  } catch (err) {
    return err;
  }
}

export async function getEventsInvitedTo(attendeeId) {
  try {
    const res = await api.get(`attendees/${attendeeId}/events/invited`);
    return res.data;
  } catch (error) {
  return error;
  }
}
