import axios from "axios";
import { useStorage } from "../useHooks/useStorage";

const {pegar} = useStorage();
const token = JSON.parse(pegar());

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Authorization: `Bearer ${token?.accessToken}`
	}
});

export default api;