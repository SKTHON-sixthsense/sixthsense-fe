import axios from "axios";

/**
 * Public Backend API
 */
const publicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: false,
});

/**
 * Private Backend API (uses JWT token over cookie)
 */
const privateAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRIVATE_API_URL,
  withCredentials: true,
});

/**
 * Next.js API Route
 */
const internalAPI = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export { publicAPI, privateAPI, internalAPI };
