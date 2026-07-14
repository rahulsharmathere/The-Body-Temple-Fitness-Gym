// single place to change the backend URL - every request in the app builds
// on top of this instead of hardcoding it in every file

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
// Then set VITE_API_BASE=https://your-backend.onrender.com/api in Vercel's environment variables.