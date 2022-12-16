import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/buzzconnect",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

async function login(username, password) {
    const parameters = {
        username: username,
        password: password,
    }
    try {
        const res = await api.post("/auth/login", new URLSearchParams(parameters));
        return res;
    } catch (error) {
      return error;
    }
}

export { login };
export default api;