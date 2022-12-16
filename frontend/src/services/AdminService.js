import api from './API'

export async function getAllAdmins() {
  try {
    const res = await api.get("/admin/all");
    return res;
  } catch (err) {
    return err;
  }
}

export async function createAdmin(username, password) {
  const params = {
    username: username,
    password: password,
  }
  try {
    const res = await api.post(`/admins/create`, new URLSearchParams(params));
    return res;
  } catch (err) {
    return err;
  }
}
