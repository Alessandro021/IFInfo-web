import axios from "axios";
import { useStorage } from "../useHooks/useStorage";
import { useUsuario } from "../store/useUsuario";

const {pegar} = useStorage();
const token = JSON.parse(pegar());

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Authorization: `Bearer ${token?.accessToken}`
	}
});

// api.interceptors.response.use(response => {
// 	return response;
// }, (error) => {
// 	const deslogarUsuario = useUsuario(state => state.deslogarUsuario);

// 	if(error.response.status === 500) {
// 		deslogarUsuario();
// 	}
// });

api.interceptors.response.use(
	response => response,
	error => {
		const deslogarUsuario = useUsuario(state => state.deslogarUsuario);
		console.log("passei");
		if (error.response.status === 500) {
			deslogarUsuario();
		}
		return Promise.reject(error);
	}
);
  

export default api;