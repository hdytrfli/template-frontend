import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const tokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;

const authClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

authClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = tokenName + ' ' + accessToken;
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshClient.post(apiUrl + '/auth/refresh');
        const token = data.data.accessToken;
        setAccessToken(token);
        originalRequest.headers.Authorization = tokenName + ' ' + token;
        return authClient(originalRequest);
      } catch {
        setAccessToken(null);
        throw error;
      }
    }

    throw error;
  },
);

export default authClient;
