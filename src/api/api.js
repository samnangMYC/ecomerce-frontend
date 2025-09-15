import axios from "axios";

const token = localStorage.getItem('auth');
if (!token) {
  console.log('No token found. User might not be logged in');
}
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials: true,
//       headers: {
//     Authorization: `Bearer ${token}`,
//   }
})

export default api;
