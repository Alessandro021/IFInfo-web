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
		}, onError: (err) => {
			toast.error("Erro ao deletar usuario");
		}});

	return mutation;
};