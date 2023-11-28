import { create } from "zustand";
import { useStorage } from "../useHooks/useStorage";

const {deletar } = useStorage();


export const useUsuario = create((set) => ({
	user: null,
	logado: false,
	loading: true,
	setUser: (data, logado, loading) => set({user: data, logado: logado, loading: loading}),
	alterarUsuario: (user) => set({user: user, logado: true, loading: false}),
	deslogarUsuario: () => {
		deletar();
		set({user: null, logado: false});
	}
}));

