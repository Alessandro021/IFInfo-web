import axios from "axios";
import { useStorage } from "../useHooks/useStorage";
import { useUsuario } from "../store/useUsuario";


const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
	const {pegar} = useStorage();
	const token = JSON.parse(pegar());
	config.headers.Authorization = `Bearer ${token?.accessToken}`;
	return config;
});

// api.interceptors.response.use(
// 	response => response,
// 	error => {
// 		if (error.response.status === 401) {
// 			const deslogarUsuario = useUsuario(state => state.deslogarUsuario);

// 			deslogarUsuario();
// 		}
// 		return Promise.reject(error);
// 	}
// );

api.interceptors.response.use(
	response => response,
	error => {
		if (error?.response?.status === 401) {
		// Dispatch a global event when a 401 error is detected
			window.dispatchEvent(new CustomEvent("unauthorized"));
		}
		return Promise.reject(error);
	}
);
  

export default api;