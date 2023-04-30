const API_BASE_URL = "http://localhost:8000"; 

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token ? true : false;
}
