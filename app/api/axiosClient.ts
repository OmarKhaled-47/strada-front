import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
// const apiUrl = "http://localhost:1337/api";
const apiUrl = "https://strada-cms-production.up.railway.app/api";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export default axiosClient;

// import axios from "axios";

// const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

// const axiosClient = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     "Content-Type": "application/json",
//     ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
//   },
// });

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle common errors globally
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
