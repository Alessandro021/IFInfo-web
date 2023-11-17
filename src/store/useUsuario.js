import { create } from "zustand";
import { useStorage } from "../useHooks/useStorage";
import api from "../services/api";

const { pegar, deletar } = useStorage();


export const useUsuario = create((set) => ({
	user: null,
	logado: false,
	loading: true,
	setUsuario: async () => {
		const token = JSON.parse(pegar());
		
		if(token && token?.accessToken){
			try {
				const { data } = await api.get("/usuario", {
					headers: {"Authorization": `Bearer ${token?.accessToken}`}
				});
				set({user: data?.result, logado: true, loading: false});
			} catch (error) {
				set({user: null, logado: false, loading: false});
			}
		} else {
			set({user: null, logado: false, loading: false});
		}
	},
	alterarUsuario: (user) => {
		set({user: user, logado: true, loading: false});
	},
	deslogarUsuario: () => {
		deletar();
		set({user: null, logado: false});
	}
}));

