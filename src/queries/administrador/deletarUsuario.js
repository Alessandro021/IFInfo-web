import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useAdministrador } from "@/src/store/useAdministrador";
import { toast } from "react-toastify";

const fetchDeletarUsuario = async ({id}) => {
	const {data} = await api.delete(`/admin/usuario/${id}`);
	return data;
};

export const useDeletarUsuario = () => {
	const deletarUsuario = useAdministrador(state => state.deletarUsuario);

	const mutation = useMutation({mutationKey: ["administrador"], mutationFn: fetchDeletarUsuario, 
		onSuccess: (data) => {
			toast.success("Usuario deletado com sucesso.");
			deletarUsuario(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar usuário.");
		}});

	return mutation;
};