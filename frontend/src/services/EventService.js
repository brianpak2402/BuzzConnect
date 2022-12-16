import api from './API'
import { getAllAttendees } from './AttendeeService';

export async function getAllEvents() {
  try {
    const response = await api.get("/events/all");
    return response.data;
  } catch (err) {
    return err;;
  }
}

export async function getAllEventsForUser(id) {
  try {
    const response = await api.get(`/events/viewpoint/${id}`);
    return response;
  } catch (err) {
    return err;;
  }
}

export async function createEvent(title, location, dateTime , description, maxCapacity, isInviteOnly, hostId, inviteList) {
  const params = {
    title,
    location,
    dateTime,
    description,
    maxCapacity,
    isInviteOnly,
    hostId,
    inviteList,
  }
  console.log(params)
  try {
    const response = await api.post('/events/create', new URLSearchParams(params));
    return response; 
  } catch (err) {
    return err;;
  }
}

export async function editEvent(title, location, dateTime, description, maxCapacity, isInviteOnly, eventId) {
  const params = {
    title,
    location,
    dateTime,
    description,
    maxCapacity,
    isInviteOnly,
  }
  try {
    const response = await api.post(`/events/edit/${eventId}`, new URLSearchParams(params));
    return response; 
  } catch (err) {
    return err;;
  }
}

export async function removeEvent(eventId) {
  try {
      const res = await api.delete(`/events/remove/${eventId}`);
      return res;
  } catch (err) {
      return err;;
  }
}

export async function getAllAttendingUsers(eventId) {
  try {
    const res = await api.get(`/events/${eventId}/attendees/all`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAllWillAttendUsers(eventId) {
  try {
    const res = await api.get(`/events/${eventId}/attendees/willAttend`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAllMightAttendUsers(eventId) {
  try {
    const res = await api.get(`/events/${eventId}/attendees/mightAttend`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAllWillNotAttendUsers(eventId) {
  try {
    const res = await api.get(`/events/${eventId}/attendees/willNotAttend`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getEvent(eventId) {
  try {
    const res = await api.get(`/events/info/${eventId}`);
    return res
  } catch (err) {
    return err;
  }
}

export async function setInviteOnlyStatus(eventId, status) {
  try {
    const res = await api.post(`/events/${eventId}/invite_only/{status}`);
    return res;
  } catch (err) {
    return err;;
  }
}

export async function getInviteOnlyStatus(eventId) {
  try {
    const res = await api.get(`/events/${eventId}/is_invite_only`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function setInvitees(eventId, inviteeUsernames) {
  const attendees = await getAllAttendees();
  var inviteeIds = ""
  for (var i = 0 ; i < attendees.length; i++) {
    if (inviteeUsernames.includes(attendees[i].username)) {
      inviteeIds += `${attendees[i].id},`
    }
  }
  inviteeIds = inviteeIds.slice(0, -1);

  try {
    const res = await api.post(`/events/${eventId}/set_invite_list/${inviteeIds}`);
    return res.data
  } catch (err) {
    return err;;
  }
}