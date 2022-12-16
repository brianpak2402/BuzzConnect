import api from './API'

export async function getAllHosts() {
  try {
    const res = await api.get("/hosts/all");
    return res;
  } catch (err) {
    return err;
  }
}

export async function createHost(username, password) {
  const params = {
    username: username,
    password: password
  }
  try {
    const res = await api.post("/hosts/create", new URLSearchParams(params));
    return res;
  } catch (err) {
    return err;
  }
}

export async function removeAttendeeRSVP(attendeeId, eventId) {
  const params = {
    attendeeId,
  }
  try {
    const res = api.post(`/${eventId}/rsvp/remove`, new URLSearchParams(params));
    return res;
  } catch (err) {
    return err;
  }
}
