import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useAdministrador } from "@/src/store/useAdministrador";

const fetchDeletarUsuario = async ({id}) => {
	const {data} = await api.delete(`/admin/usuario/${id}`);
	return data;
};

export const useDeletarUsuario = () => {
	const deletarUsuario = useAdministrador(state => state.deletarUsuario);

	const mutation = useMutation({mutationKey: ["administrador"], mutationFn: fetchDeletarUsuario, 
		onSuccess: (data) => {
			alert("Usuario deletado com sucesso.");
			deletarUsuario(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar usuario");
		}});

	return mutation;
};