import { useEffect } from "react";
import { useUsuario } from "../store/useUsuario";

export const useLogado = () => {
	const setUsuario = useUsuario(state => state.setUsuario);
	const logado = useUsuario(state => state.logado);
	const loading = useUsuario(state => state.loading);

	useEffect(() => {
		setUsuario();
	},[setUsuario]);

	return {logado, loading};
};