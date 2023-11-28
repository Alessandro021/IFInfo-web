import { useUsuario } from "../store/useUsuario";
import { useBuscarUsuario } from "../queries/usuario/buscarUsuario";

export const useLogado = () => {
	useBuscarUsuario();
	const logado = useUsuario(state => state.logado);
	const loading = useUsuario(state => state.loading);
	
	return {logado, loading};
};